import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import TrendingPosts from "@/components/TrendingPosts";
import Connected from "@/components/auth/Connected";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Box marginX={"auto"} maxW={"1400px"} as="main">
        <HeaderNav />
        <HeroSection />
        <Box mx={"auto"} maxW={"1350px"}>
          <Connected />
          <TrendingPosts />
        </Box>
      </Box>

      <Footer />
    </>
  );
}
