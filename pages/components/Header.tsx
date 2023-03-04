import { Heading, Flex } from "@chakra-ui/react";

export default function Header() {
    return (
        <Flex
            justify="center"
            align="center"
            p="1rem"
            borderBottom="1px solid #94a3b8"
        >
            <Heading
                letterSpacing="5px"
                fontSize="4rem"
                color="#e2e8f0"
                
            >
                JOBIFY
            </Heading>
        </Flex>
    )
}