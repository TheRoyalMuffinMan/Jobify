import { Text, Flex } from "@chakra-ui/react";

export default function Hero() {
    return (
        <Flex
            justify="space-between"
            align="center"
            p="1rem"
            borderBottom="1px solid #94a3b8"
        >
            <Text
                fontSize="2rem"
                color="#e2e8f0"
            >
                JOBIFY
            </Text>
        </Flex>
    )
}