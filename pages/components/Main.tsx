import { Text, Flex, Stack, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';


export default function Main() {
    const router = useRouter();

    return (
        <Flex
            justify="center"
            flex="1"
            backgroundImage={`url(/wave.svg)`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
        >
            <Stack spacing="5">
                <Text fontSize="1.5rem" color="white">
                    Powered by artifical intellgence...
                </Text>
                <Text fontSize="1.5rem" color="#0EA5E9">
                    Verify every job application with ease and secure your future career.
                </Text>
                <Flex justify="center">
                    <Button 
                        fontSize="1.5rem" 
                        bg="#0EA5E9" 
                        type="submit" 
                        p="1.75rem" 
                        w="200px"
                        onClick={() => router.push("/verify")}
                    >
                        Get Started   
                    </Button>
                </Flex>
            </Stack>
        </Flex>
    )
}