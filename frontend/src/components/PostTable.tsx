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
} from "@chakra-ui/react";

export default function PostTable({ data }: { data: any }) {
  const tableHeadStyles = {
    pb: 4,
    textTransform: "capitalize" as ResponsiveValue<"capitalize">,
    fontSize: "16px",
    fontWeight: "medium",
    color: "#9CA4AB",
  };
  const statusColor = (status: POST_STATUS) =>
    status === "PUBLISHED" ? "appGreen" : "appRed";
  return (
    <TableContainer>
      <Table>
        <Thead mb={5}>
          <Tr h={"auto"}>
            <Th paddingInlineStart={0} {...tableHeadStyles}>
              Name
            </Th>
            <Th {...tableHeadStyles}>Date</Th>
            <Th {...tableHeadStyles}>Amount</Th>
            <Th {...tableHeadStyles}>Status</Th>
            <Th {...tableHeadStyles}>Invoice</Th>
          </Tr>
        </Thead>
        <Tbody className="files-table-body">
          {data.map((d, i) => (
            <Tr key={"data" + i} h={"45px"}>
              <Td paddingInlineStart={0}>
                <HStack gap={"10px"}>
                  <Text as={"span"} fontWeight={"medium"} fontSize={"16px"}>
                    {d.name}
                  </Text>
                </HStack>
              </Td>
              <Td color={"appGray.500"}>{d.date}</Td>
              <Td fontWeight={"medium"}>{d.amount}</Td>
              <Td color={statusColor(d.status as POST_STATUS)}>{d.status}</Td>
              <Td>
                <HStack>
                  <Button
                    py={"2px"}
                    px={"4px"}
                    variant={"ghost"}
                    colorScheme="appGray"
                    color={"#0D062D"}
                    fontWeight={"normal"}
                    fontSize={"14px"}
                    gap={"6px"}
                    h="auto"
                  >
                    {/* <Image alt="" src="/icons/document-download.svg" />{" "} */}
                    <span>View</span>
                  </Button>
                  <Button
                    py={"2px"}
                    px={"4px"}
                    variant={"ghost"}
                    colorScheme="appGray"
                    color={"#0D062D"}
                    fontWeight={"normal"}
                    fontSize={"14px"}
                    gap={"6px"}
                    h="auto"
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
  );
}
