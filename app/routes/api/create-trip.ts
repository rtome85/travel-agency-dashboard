import { GoogleGenerativeAI } from "@google/generative-ai";
import { type ActionFunctionArgs, data } from "react-router";
import { parseMarkdownToJson } from "~/lib/utils";
import { appwriteConfig, databases } from "~/appwrite/client";
import { ID } from "appwrite";
import { Ollama } from "ollama";

export const action = async ({ request }: ActionFunctionArgs) => {
	const {
		country,
		numberOfDays,
		travelStyle,
		interests,
		budget,
		groupType,
		//userId
	} = await request.json();

	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
	const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

	try {
		const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
        Budget: '${budget}'
        Interests: '${interests}'
        TravelStyle: '${travelStyle}'
        GroupType: '${groupType}'
        Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
        {
        "name": "A descriptive title for the trip",
        "description": "A brief description of the trip and its highlights not exceeding 100 words",
        "estimatedPrice": "Lowest average price for the trip in EUR, e.g.price€",
        "duration": ${numberOfDays},
        "budget": "${budget}",
        "travelStyle": "${travelStyle}",
        "country": "${country}",
        "interests": "${interests}",
        "groupType": "${groupType}",
        "bestTimeToVisit": [
          '🌸 Season (from month to month): reason to visit',
          '☀️ Season (from month to month): reason to visit',
          '🍁 Season (from month to month): reason to visit',
          '❄️ Season (from month to month): reason to visit'
        ],
        "weatherInfo": [
          '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
          '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
        ],
        "location": {
          "city": "name of the city or region",
          "coordinates": [latitude, longitude],
          "openStreetMap": "link to open street map"
        },
        "itinerary": [
        {
          "day": 1,
          "location": "City/Region Name",
          "activities": [
            {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
            {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
            {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
          ]
        },
        ...
        ]
        }`;

		// const textResult = await genAI
		// 	.getGenerativeModel({ model: "gemini-2.0-flash" })
		// 	.generateContent([prompt]);

		const ollama = new Ollama({
			host: "https://ollama.com",
			headers: {
				Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
			},
		});

		const textResult = await ollama.chat({
			model: "gpt-oss:120b",
			messages: [{ role: "user", content: prompt }],
			stream: false,
		});

		// for await (const part of textResult) {
		// 	process.stdout.write(part.message.content);
		// }

		// console.log(textResult);

		// const trip = parseMarkdownToJson(textResult.response.text());

		const fullResponse = textResult.message.content;

		let trip;
		try {
			// Try parsing as direct JSON first
			trip = JSON.parse(fullResponse);
		} catch {
			// Fall back to markdown parsing
			trip = parseMarkdownToJson(fullResponse);
		}

		if (!trip) {
			throw new Error("Failed to parse AI response into valid JSON");
		}

		let imageUrls: string[] = [];
		try {
			const imageResponse = await fetch(
				`https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
			);

			if (imageResponse.ok) {
				const imageData = await imageResponse.json();
				if (
					imageData &&
					imageData.results &&
					Array.isArray(imageData.results)
				) {
					imageUrls = imageData.results
						.slice(0, 3)
						.map((result: any) => result.urls?.regular || null);
				}
			}
		} catch (imageError) {
			console.error("Error fetching images:", imageError);
			// Continue without images if Unsplash API fails
		}

		const result = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.tripCollectionId,
			ID.unique(),
			{
				tripDetail: JSON.stringify(trip),
				createdAt: new Date().toISOString(),
				imageUrls,
				//userId,
			}
		);

		return data({ id: result.$id });
	} catch (error) {
		console.error("Error generating travel plan: ", error);
		return data({ error: "Failed to generate travel plan" }, { status: 500 });
	}
};
