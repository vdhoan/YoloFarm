import React, { useState } from "react";
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

export default function UserProfileCard() {
  const [userData, setUserData] = useState({
    firstName: "QUYNH",
    lastName: "DANG THI",
    email: "dangthiquynh@gmail.com",
    username: "Trường Đại học Bách khoa - ĐHQG TP.HCM, VRJ4+65C, Đông Hoà, Dĩ An, Bình Dương",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: 800,
        mx: "auto",
        borderRadius: 3,
        mt: 3,
        backgroundColor: "#fff",
        marginTop: "30px",
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        THÔNG TIN CÁ NHÂN
      </Typography>

      <Box textAlign="center" mb={3}>
        <Avatar sx={{ width: 80, height: 80, mx: "auto" }} />
        <Typography mt={1} fontWeight="bold">
          {userData.lastName} {userData.firstName}
        </Typography>

        <Box mt={1} display="flex" justifyContent="center" gap={2}>
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
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="lastname-box">
            <TextField
              label="Họ"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "300px",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="firstname-box">
            <TextField
              label="Tên"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "300px",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="email-box">
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "695px",
                  backgroundColor: "#d3cdcd",
                  borderRadius: "6px",
                  fontWeight: 500,
                },
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="username-box">
            <TextField
              label="Địa chỉ"
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  width: "695px",
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
