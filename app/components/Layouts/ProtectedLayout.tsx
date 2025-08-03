'use client';

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import NavBar from "@/app/components/NavBars/Navbar";
import SideBar from "@/app/components/NavBars/SideBar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {

    const token = localStorage.getItem("token");
    const lastLogin = localStorage.getItem("lastLogin");

    const router = useRouter();
    const pathname = usePathname();
    const isExcluded = pathname.startsWith("/auth");

    useEffect(() => {
        let lastLoginTime = dayjs().hour(0).minute(0).second(0);

        if (lastLogin) {
            const [hour, minute] = lastLogin.split(":").map(Number);
            lastLoginTime = lastLoginTime.hour(hour).minute(minute);
        }

        const hoursPassed = dayjs().diff(lastLoginTime, 'hour');
        const deleteToken = hoursPassed >= 8;

        if (deleteToken) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("lastLogin");
            router.push("/auth/login");
        }
       
        if (!token && !isExcluded) {
            router.push("/auth/login");
        }

    }, [token,isExcluded,pathname]);

    if (isExcluded) return children;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <Box sx={{ flexShrink: 0 }}>
                <NavBar />
            </Box>

            <Box sx={{ display: "flex", flexGrow: 1 }}>
                <Box sx={{ width: 250, maxHeight: "85vh" }}>
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
                        maxHeight: "85vh",
                        marginBottom: 8,
                    }}
                    className="m-2 border-2 border-gray-200 ml-10"
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
