import { chakra, Text } from '@chakra-ui/react';
import Hero from "./components/Hero";

export default function Home({ hackathons }: any) {
    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
        >
            <Hero />
            {hackathons.length === 0 ? (
                <Text align="center">No Hackathons To List</Text>
            ) : (
                hackathons.map((hack: any, i: any) => {
                    return <Text align="center" key={i}>{hack.hackathon_name}</Text>
                })
            )}
        </chakra.div>
    ); 
}

export async function getServerSideProps(ctx: any) {
    // get the current environment
    const dev = process.env.NODE_ENV !== 'production';
    const { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    const response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/hackathons`);
    // extract the data
    const data = await response.json();

    return {
        props: {
            hackathons: data['response'],
        },
    };
}
