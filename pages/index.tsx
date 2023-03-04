import { chakra, Text } from '@chakra-ui/react';
import Header from './components/Header';

export default function Home({ hackathons }: any) {
    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
            bg="#0F172A"
        >
            <Header />
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
