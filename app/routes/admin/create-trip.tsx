import React, { useState } from 'react'
import { Header } from 'components'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import type { Route } from './+types/create-trip';
import { selectItems, comboBoxItems } from '~/constants';
import { formatKey } from '~/lib/utils';
import { LayersDirective, MapsComponent, LayerDirective } from '@syncfusion/ej2-react-maps';
import { world_map } from '~/constants/world_map';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { cn } from '~/lib/utils';
import {account} from '~/appwrite/client';
import { useNavigate } from 'react-router';

export const loader = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,latlng');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Expected array of countries but received different data type');
    }

    return data.map((country: any) => ({
      name: `${country.flag } ${country.name.common}`,
      coordinates: country.latlng, 
      value: country.name.common,
      openStreetMap: country.maps?.openStreetMap,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return empty array as fallback
    return [];
  }
}

const CreateTrip = ({loaderData}: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || '', 
    travelStyle: '', 
    interest: '',
    budget: '', 
    duration: 0, 
    groupType: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key : keyof TripFormData, value: string | number  ) => {
    setFormData({...formData, [key]: value})
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if(!formData.country || !formData.duration || !formData.travelStyle || !formData.interest || !formData.budget || !formData.groupType){
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if(formData.duration < 1 || formData.duration > 10){
      setError('Duration must be between 1 and 10 days')
      setLoading(false)
      return;
    }

    // const user = await account.get();
    // if(!user){
    //   setError('User not authenticated')
    //   setLoading(false)
    //   return;
    // }
    // const user = {
    //   $id: '6873c9b5c4feca9b8de7'
    // }
    // console.log(user);
    

    try {
      const response = await fetch('/api/create-trip', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
          country: formData.country, 
          numberOfDays: formData.duration, 
          travelStyle: formData.travelStyle, 
          interests: formData.interest,
          budget: formData.budget, 
          groupType: formData.groupType, 
          //userId: user.$id
        })
      })

      const result: CreateTripResponse = await response.json()

      if(result?.id) navigate(`/trips/${result.id}`)
      else console.error('Failed to generate trip')
      
    } catch (error) {
      console.error('Error generating trip', error);
    }finally {
      setLoading(false)
    }

  }

  const mapData = [
    {
      country: formData.country, 
      color: 'EAE382E', 
      coordinates: countries.find( (c: Country) => c.name === formData.country)?.coordinates || []
    }
  ]

  const countryData = countries.map( (country) => ({
    text: country.name, 
    value: country.value
  }) )

  return (
    <main className="flex flex-col gap-10 pb-10 wrapper">
      <Header title="Add a New Trip" description="View and edit AI-generated travel plans"/>

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">
              Country
            </label>
            <ComboBoxComponent 
              id="country"
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder="Select Country"
              className="combo-box"
              change={(e: {value: string | undefined}) => {
                if(e.value){
                  handleChange('country', e.value)
                }}
              }
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase(); 
                e.updateData(
                  countries.filter((country) => 
                    country.name.toLowerCase().includes(query)).map((country) => ({
                      text: country.name, 
                      value: country.value
                    }))
                )
              }}
            />
          </div>
          <div>
            <label htmlFor='duration'>Duration</label>
            <input
              id='duration'
              name='duration'
              placeholder='Enter a number of days(5, 12 ...d)'
              className='form-input place placeholder:text-gray-100'
              onChange={(e) => handleChange('duration', Number(e.target.value))}
            />
          </div>
          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBoxComponent 
                id={key}
                dataSource={comboBoxItems[key].map( (item) => ({
                  text: item,
                  value: item
                }))}
                fields={{text:'text', value: 'value'}}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: {value: string | undefined}) => {
                  if(e.value){
                    handleChange(key, e.value)
                  }}
                }
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase(); 
                  e.updateData(
                    comboBoxItems[key].filter((item) => 
                      item.toLowerCase().includes(query)).map((item) => ({
                        text: item, 
                        value: item
                      }))
                  )
                }}
                className='combo-box'
              />
            </div>
          ))}
          <div>
            <label htmlFor="location">Location on the World map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective 
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath='name'
                  shapeDataPath='country'
                  shapeSettings={{
                    colorValuePath: 'color',
                    fill: '#e5e5e5'
                  }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>
          <div className='bg-gray-200 h-px w-full'>
          </div>
          {error && (
            <div className='error'>
              <p>{error}</p>
            </div>
          )}
          <footer className='px-6 w-full'>
            <ButtonComponent 
              type='submit'
              className='button-class !h-12 !w-full'
              disabled={loading} 
            >
              <img 
                src={ `/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}` } 
                alt="add trip" 
                className={cn(
                  'size-5',
                  loading && 'animate-spin'
                )}
              />
              <span className='p-16-semibold text-white'>
                {loading ? 'Generating' : 'Generate Trip'}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip