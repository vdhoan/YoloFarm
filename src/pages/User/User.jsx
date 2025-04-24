import React, { useState,useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
  IconButton
} from "@mui/material";
import "./User.css"
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import { profile } from "../../services/Api";
// import { UserContext } from "../../components/Context/userContext";

export default function UserProfileCard() {
  // const { userData } = useContext(UserContext)
  const [userData, setUserData] = useState({})
  // console.log("layour ", userData)
  useEffect(() => {
          const token = localStorage.getItem("token");
          if (!token) return;
  
          const getMyInfor = async () => {
              try {
                  const response = await profile(token);
                  // console.log("user context", response.data);
                  setUserData(response.data);
              } catch (error) {
                  console.error("Failed to fetch user profile:", error);
              }
          };
  
          getMyInfor();
      }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: 800,
        mx: "auto",
        borderRadius: 3,
        
        backgroundColor: "#fff",
        marginTop: "70px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        THÔNG TIN CÁ NHÂN
      </Typography>

      <Box textAlign="center" mb={3}>
        <Avatar sx={{ width: 80, height: 80, mx: "auto" }} />
        <Typography mt={1} mb={4} fontWeight="bold">
          {userData?.name}
        </Typography>

        {/* <Box mt={1} display="flex" justifyContent="center" gap={2}>
          <IconButton>
            <EditIcon fontSize="small" />
            <Typography fontSize={14} ml={0.5}>
              Chỉnh sửa
            </Typography>
          </IconButton>
          <IconButton>
            <LockResetIcon fontSize="small" />
            <Typography fontSize={14} ml={0.5}>
              Đổi mật khẩu
            </Typography>
          </IconButton>
        </Box> */}
      </Box>

      <Grid
        container
        spacing={2}
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}
      >
        <Grid sx={{ gridColumn: 'span 6' }}>
          <div className="lastname-box">
            <TextField
              label="User Name"
              name="UserName"
              value={userData?.username || ""}
              fullWidth
              disabled
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "100%",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>

        <Grid sx={{ gridColumn: 'span 6' }}>
          <div className="firstname-box">
            <TextField
              label="Họ tên"
              name="Name"
              value={userData?.name || ""}
              disabled
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "100%",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>

        <Grid sx={{ gridColumn: 'span 12' }}>
          <div className="email-box">
            <TextField
              label="ID người dùng"
              name="id"
              value={userData?._id || ""}
              disabled
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "100%",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>

        <Grid sx={{ gridColumn: 'span 12' }}>
          <div className="username-box">
            <TextField
              label="Địa chỉ"
              name="address"
              value={"Đường Tạ Quang Bửu, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh."}
              disabled
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "100%",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>
      </Grid>

    </Paper>
  );
}
