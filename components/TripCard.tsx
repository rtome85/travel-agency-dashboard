import { Link, useLocation } from "react-router";
import { ChipDirective, ChipListComponent, ChipsDirective } from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "~/lib/utils";

const TripCard = ({ id, name, imageUrl, tags, price, location }: TripCardProps) => {  
    const path = useLocation();

    return (
        <Link 
            to={path.pathname === "/" || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id} `} 
            className="trip-card"
        >
            <img src={imageUrl} alt={name} />

            <article>
                <h2 className="text-base font-medium">{name}</h2>
                <figure className="flex items-center gap-2">
                    <img src="/assets/icons/location-mark.svg" alt="Location" className="size-4" />
                    <figcaption className="text-sm font-medium text-gray-100 truncate">{location}</figcaption>
                </figure>
            </article>

            <div className="mt-5 pl-4 pr-4 pb-5">
                <ChipListComponent id="travel-chip">
                    <ChipsDirective>
                        {tags?.map((tag, index) => (
                            <ChipDirective 
                                key={index} 
                                text={getFirstWord(tag)}
                                cssClass={
                                    cn(index === 1 ? '!bg-pink-50 !text-pink-500' : '!bg-sucess-50 !text-success-700' )
                                }
                            />
                        ))}
                    </ChipsDirective>
                </ChipListComponent>
            </div>
            <article className="tripCard-pill">{price}</article>
            
        </Link>
    )
};

export default TripCard;