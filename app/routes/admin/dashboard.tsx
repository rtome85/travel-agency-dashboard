import { Header, StatsCard, TripCard } from "components";
import { getUser } from "~/appwrite/auth";
import { allTrips, dashboardStats, user, users } from "~/constants";
import type { Route } from './+types/dashboard';

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;


export const clientLoader = async () => await getUser();

const Dashboard = ({loaderData}: Route.ComponentProps) => {
  const user = loaderData as User | null ;

  return (
    <main className="dashboard wrapper">
        <Header 
            title={`Welcome back, ${user?.name || "User"}`}
            description="Track activity, trends and popular destinations in real time"
        />

        {/* Stats */}
        <section className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <StatsCard 
              headerTitle="Total Users"
              total={totalUsers}
              currentMonthCount={usersJoined.currentMonth}
              lastMonthCount={usersJoined.lastMonth}
            />
            <StatsCard 
              headerTitle="Total Trips"
              total={totalTrips}
              currentMonthCount={tripsCreated.currentMonth}
              lastMonthCount={tripsCreated.lastMonth}
            />
            <StatsCard 
              headerTitle="Active Users Today"
              total={userRole.total}
              currentMonthCount={userRole.correntMonth}
              lastMonthCount={userRole.lastMonth}
            />
          </div>
        </section>

        {/* Created Trips */}
        <section className="container">
          <h1 className="text-xl font-semibold text-dark-100">
            Created Trips
          </h1>
          <div className="trip-grid">
            {allTrips.slice(0, 4).map(({id, name, imageUrls, estimatedPrice, tags, itinerary}) => (
              <TripCard 
                key={id} 
                id={id.toString()}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location ?? ""}
                tags={tags}
                price={estimatedPrice}
              />
            ))}
          </div>
        </section>
    </main>
  );
};

export default Dashboard;
