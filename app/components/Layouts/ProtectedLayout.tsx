'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import NavBar from "@/app/components/NavBars/Navbar";
import SideBar from "@/app/components/NavBars/SideBar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const isExcluded = pathname.startsWith("/auth");

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const lastLogin = localStorage.getItem("lastLogin");

        let shouldRedirect = false;

        if (lastLogin) {
            const [hour, minute] = lastLogin.split(":").map(Number);
            const lastLoginTime = dayjs().hour(hour).minute(minute).second(0);
            const hoursPassed = dayjs().diff(lastLoginTime, 'hour');

            if (hoursPassed >= 8) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("lastLogin");
                shouldRedirect = true;
            }
        }

        if (!token || shouldRedirect) {
            if (!isExcluded) {
                router.push("/auth/login");
            }
        }

        setIsLoading(false);
    }, [pathname]);

    if (isExcluded) return children;
    if (isLoading) return null;

   return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
  
        <Box sx={{ flexShrink: 0 }}>
            <NavBar />
        </Box>

        <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
          
            <Box
                sx={{
                    width: 250,
                    height: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    borderRight: '1px solid #ddd',
                }}
>
                <SideBar />
            </Box>

  
            <Box
                sx={{
                    flexGrow: 1,
                    p: 4,
                    bgcolor: "#fff",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    overflowY: "auto",
                    height: '100%',
                }}
                className="m-2 border-2 border-gray-200 ml-4">
                {children}
            </Box>
        </Box>
    </Box>
);

}
