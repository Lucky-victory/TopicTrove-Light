import { shortenText } from "@/lib/utils";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
export default function ArticleCard({ article }: { article: any }) {
  return (
    <Flex
      flex={1}
      maxW={"650px"}
      gap={4}
      wrap={{ base: "wrap-reverse", md: "nowrap" }}
    >
      <Box>
        <Heading mb={2} as={"h3"} size={"md"}>
          <Link href={`/${article.author?.username}/${article?.slug}`}>
            {article?.title}
          </Link>
        </Heading>
        <Text color={"appBlack.500"} fontSize={"14px"}>
          {article?.intro
            ? shortenText(article?.intro, 150)
            : shortenText(article?.content, 150)}
        </Text>
        <HStack my={3}>
          <Text as={"span"} fontSize={"14px"}>
            <Text as={"span"}>Published on </Text>
            <Text as={"span"} color="appBlack.700" fontWeight={600}>
              {format(new Date(article?.createdAt), "MMM dd, yyyy")}
            </Text>
          </Text>
          <Box w={1} h={1} rounded={"full"} bg={"appBlack.400"}></Box>
          <Text fontWeight={500} color={"appBlack.600"} fontSize={"14px"}>
            {article?.readTime} min read
          </Text>
        </HStack>
      </Box>
      <Link
        href={`/${article.author?.username}/${article?.slug}`}
        minW={{ md: 240 }}
        w={{ base: "full", md: "auto" }}
        h={{ base: "240px", md: "150px" }}
        bg={"appBlack.500"}
      >
        <Image
          alt=""
          objectFit={"cover"}
          src={article?.coverImage}
          w="full"
          h={"full"}
        />
      </Link>
    </Flex>
  );
}
