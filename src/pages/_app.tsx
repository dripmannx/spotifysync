import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import dayjs from "dayjs";
import { type AppType } from "next/app";
import { ThemeProvider } from "~/components/ui/theme-provider";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import Layout from "../components/Layout/Layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <ClerkLoaded>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
