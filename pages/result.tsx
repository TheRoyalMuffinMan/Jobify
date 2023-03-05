import { chakra, Flex, Spinner, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import Header from './components/Header';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Results = {
    response: string;
    real: number;
    fake: number;
    success?: boolean
}

export default function Result() {
    const router: NextRouter = useRouter();
    const [result, setResult] = useState<Results | undefined>(undefined);

    useEffect(() => {
        if (!router.query || Object.keys(router.query).length === 0) {
            router.push("/");
        }
    }, [router]);

    async function analysis(params: object) {

        if (!params || Object.keys(params).length === 0) {
            router.push("/");
        }

        const response = await fetch("/api/analyzer", {
            method: "POST",
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            throw new Error("Failed to make post");
        }

        const res = await response.json();
        setResult(res);
    }

    useEffect(() => {
        analysis(router.query);
    }, []);


    if (result === undefined) {
        return (
            <chakra.div 
                display="flex" 
                flexDirection="column" 
                minHeight="100vh"
                bg="#0F172A"
            >
                <Header />
                <Flex justify="center" align="center" flex="1">
                    <Spinner
                        thickness='12px'
                        speed='1s'
                        emptyColor='gray.200'
                        color='blue.500'
                        boxSize="250px"
                    />
                </Flex>
            </chakra.div>
        )
    }

    console.log(result);

    return (
        <chakra.div 
            display="flex" 
            flexDirection="column" 
            minHeight="100vh"
            bg="#0F172A"
        >
            <Header />
            <Flex justify="space-evenly" align="center" flex="1" color="#0EA5E9">
                <CircularProgress size="400px" value={result.real * 100} color='green.400'>
                    <CircularProgressLabel fontSize="2rem" boxSize="200px">
                        {`${(result.real * 100).toFixed(4)}% Likely to be a Real Job Posting`}
                    </CircularProgressLabel>
                </CircularProgress>
                <CircularProgress size="400px" value={result.fake * 100} color='green.400'>
                    <CircularProgressLabel fontSize="2rem" boxSize="200px">
                        {`${(result.fake * 100).toFixed(4)}% Likely to be a Fake Job Posting`}
                    </CircularProgressLabel>
                </CircularProgress>
            </Flex>

        </chakra.div>
    ); 
}
