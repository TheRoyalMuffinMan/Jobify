import { chakra, Flex, Spinner } from '@chakra-ui/react';
import Header from './components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Result() {
    const router = useRouter();
    const [result, setResult] = useState<string | undefined>(undefined);

    // useEffect(() => {
    //     if (!router.query || Object.keys(router.query).length === 0) {
    //         router.push("/");
    //     }
    // }, [router]);

    async function analysis(params: object) {
        const response = await fetch("/api/analyzer", {
            method: "POST",
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error("Failed to make post");
        }

        const result = await response.json();
        console.log(result);
    }

    // useEffect(() => {
    //     analysis(router.query);
    // });


    if (result === undefined) {
        return (
            <chakra.div 
                display="flex" 
                flexDirection="column" 
                minHeight="100vh"
                bg="#0F172A"
            >
                <Header />
                <Flex justify="center" align="center">
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Flex>
            </chakra.div>
        )
    }



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
