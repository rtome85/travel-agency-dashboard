import { Header } from "components";
import { GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
import React from "react";

const Trips = () => {
    return(
        <main className="wrapper">
            <Header 
                title="Manage Trips" 
                description="View and edit AI-generated travel plans" 
                ctaText="Create Trip"
                ctaLink="/trips/create"
            />
            <GridComponent dataSource={[]} gridLines="None">
                <ColumnsDirective>
                    <ColumnDirective field="name" headerText="Name" width="200" textAlign="Left" />
                </ColumnsDirective>
            </GridComponent>
        </main>
    )
};

export default Trips;