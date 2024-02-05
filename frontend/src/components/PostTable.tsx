import {
  convertCamelCaseToSpace,
  removeKeyFromObject,
  shortenText,
} from "@/lib/utils";
import { POST_STATUS } from "@/types/common";
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Button,
  Table,
  ResponsiveValue,
  Text,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

export default function PostTable() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Full Guide: How to Upload to IPFS",
      intro: "",
      content:
        "The Internet is, without doubt, one of the most significant inventions in modern-day society. A majority of the world’s population utilizes the internet daily for activities such as online banking, investing, and education. However, even though the web is crucial in our everyday lives, the current system remains troubled by flaws. Some issues of the internet originate from centralization making decentralization a hot topic. As such, decentralized Web3 systems and **dApps** have been developed, and one of the most exciting projects is **IPFS** (InterPlanetary File System). This is a distributed system for storing files based on content instead of location. However, even though IPFS has grown relatively widespread, it remains unknown to many how to store files in this system. As such, we will in this article look closer at how you can upload files to IPFS with Moralis.\n\nUploading files to IPFS can be a pretty arduous task without the proper underlying infrastructure. However, this is what the Moralis platform provides, making it possible to upload files to IPFS with a single line of code.",
      userId: 1,
      slug: "full-guide-how-to-upload-to-ipfs-hz4tofiyw",
      views: 9,
      readTime: null,
      isLocked: false,
      isVerified: false,
      createdAt: "2024-01-29T21:56:52.000Z",
      updatedAt: null,
      status: "PUBLISHED",
      coverImage: "",
      author: {
        avatar: null,
        fullName: "Lucky victory",
        firstName: "Victory",
        isVerified: false,
        id: 1,
        username: "lucky-victory",
      },
    },
    {
      id: 3,
      title: "Full Guide: How to Upload to IPFS",
      intro: "",
      content:
        "The Internet is, without doubt, one of the most significant inventions in modern-day society. A majority of the world’s population utilizes the internet daily for activities such as online banking, investing, and education. However, even though the web is crucial in our everyday lives, the current system remains troubled by flaws. Some issues of the internet originate from centralization making decentralization a hot topic. As such, decentralized Web3 systems and **dApps** have been developed, and one of the most exciting projects is **IPFS** (InterPlanetary File System). This is a distributed system for storing files based on content instead of location. However, even though IPFS has grown relatively widespread, it remains unknown to many how to store files in this system. As such, we will in this article look closer at how you can upload files to IPFS with Moralis.\n\nUploading files to IPFS can be a pretty arduous task without the proper underlying infrastructure. However, this is what the Moralis platform provides, making it possible to upload files to IPFS with a single line of code.",
      userId: 1,
      slug: "full-guide-how-to-upload-to-ipfs-hz4tofiyw",
      views: 9,
      readTime: null,
      isLocked: false,
      isVerified: false,
      createdAt: "2024-01-29T21:56:52.000Z",
      updatedAt: null,
      status: "PUBLISHED",
      coverImage: "",
      author: {
        avatar: null,
        fullName: "Lucky victory",
        firstName: "Victory",
        isVerified: false,
        id: 1,
        username: "lucky-victory",
      },
    },
    {
      id: 2,
      title: "Full Guide: How to Upload to IPFS",
      intro: "",
      content:
        "The Internet is, without doubt, one of the most significant inventions in modern-day society. A majority of the world’s population utilizes the internet daily for activities such as online banking, investing, and education. However, even though the web is crucial in our everyday lives, the current system remains troubled by flaws. Some issues of the internet originate from centralization making decentralization a hot topic. As such, decentralized Web3 systems and **dApps** have been developed, and one of the most exciting projects is **IPFS** (InterPlanetary File System). This is a distributed system for storing files based on content instead of location. However, even though IPFS has grown relatively widespread, it remains unknown to many how to store files in this system. As such, we will in this article look closer at how you can upload files to IPFS with Moralis.\n\nUploading files to IPFS can be a pretty arduous task without the proper underlying infrastructure. However, this is what the Moralis platform provides, making it possible to upload files to IPFS with a single line of code.",
      userId: 1,
      slug: "full-guide-how-to-upload-to-ipfs-hz4tofiyw",
      views: 9,
      readTime: null,
      isLocked: false,
      isVerified: false,
      createdAt: "2024-01-29T21:56:52.000Z",
      updatedAt: null,
      status: "PUBLISHED",
      coverImage: "",
      author: {
        avatar: null,
        fullName: "Lucky victory",
        firstName: "Victory",
        isVerified: false,
        id: 1,
        username: "lucky-victory",
      },
    },
  ]);
  const data = removeKeyFromObject(posts, ["author"]);
  const tableHeadStyles = {
    pb: 4,
    textTransform: "capitalize" as ResponsiveValue<"capitalize">,
    fontSize: "16px",
    fontWeight: "medium",
    color: "#9CA4AB",
  };
  const statusColor = (status: POST_STATUS) => {
    switch (status) {
      case "PUBLISHED":
        return "green";
        break;
      case "DELETED":
        return "red";
        break;
      default:
        return "black";
        break;
    }
  };

  async function fetchPosts() {
    try {
      const response = (await axios.get("/api/users/lucky-v/posts")).data;
      const posts = response.data;
      setPosts(posts);
    } catch (error) {}
  }
  useEffect(() => {
    fetchPosts();
  });

  function renderTableItems(dataItem: any) {
    const keys = Object.keys(dataItem);
    console.log({ keys });

    return keys.reduce((acc, item) => {
      switch (item) {
        case "intro":
          acc.push(
            <Td>
              <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                {shortenText(dataItem.intro)}
              </Text>
            </Td>,
          );
          break;
        case "content":
          acc.push(
            <Td>
              <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                {shortenText(dataItem.content)}
              </Text>
            </Td>,
          );
          break;
        case "title":
          acc.push(
            <Td>
              <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                {shortenText(dataItem.title)}
              </Text>
            </Td>,
          );
          break;
        case "createdAt":
          acc.push(
            <Td>
              <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                {format(new Date(dataItem.createdAt), "MMM dd, yyyy hh:mm a")}
              </Text>
            </Td>,
          );
          break;
        case "status":
          acc.push(
            <Td color={statusColor(dataItem.status as POST_STATUS)}>
              {dataItem.status}
            </Td>,
          );
          break;
        default:
          acc.push(
            <Td>
              <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                {dataItem[item] + ""}
              </Text>
            </Td>,
          );
          break;
      }
      return acc;
    }, [] as React.JSX.Element[]);
  }
  return (
    <Flex bg={"white"} maxW={"full"} p={4}>
      <TableContainer>
        <Table>
          <Thead mb={5}>
            <Tr h={"auto"}>
              {convertCamelCaseToSpace(data[0]).map((key, i) => (
                <Th key={"header" + i} {...tableHeadStyles}>
                  {key}
                </Th>
              ))}
              <Th {...tableHeadStyles}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody className="files-table-body">
            {data.map((d, i) => (
              <Tr key={`data-${i}-${d.id}`} h={"45px"}>
                {/* <Td>{d.id}</Td>
                <Td>
                  <Text as={"span"} fontWeight={"medium"} fontSize={"14px"}>
                    {shortenText(d.title)}
                  </Text>
                </Td>
                // 
                <Td color={statusColor(d.status as POST_STATUS)}>{d.status}</Td> */}
                {[...renderTableItems(d)]}
                <Td>
                  <HStack>
                    <Button
                      rounded={"full"}
                      variant={"outline"}
                      fontSize={"14px"}
                      gap={"6px"}
                      size={"sm"}
                    >
                      {/* <Image alt="" src="/icons/document-download.svg" />{" "} */}
                      <span>View</span>
                    </Button>
                    <Button
                      rounded={"full"}
                      variant={"solid"}
                      fontSize={"14px"}
                      gap={"6px"}
                      size={"sm"}
                    >
                      {/* <Image alt="" src="/icons/document-download.svg" />{" "} */}
                      <span>Edit</span>
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
