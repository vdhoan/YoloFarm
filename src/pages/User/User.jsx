import React, { useContext } from "react";
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
import { UserContext } from "../../components/Context/userContext";

export default function UserProfileCard() {
  const {userData} = useContext(UserContext)
  console.log("layour ",userData)
  // const [profile, setProfile] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData(prev => ({ ...prev, [name]: value }));
  // };

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
          {userData?.name} 
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
              label="User Name"
              name="UserName"
              value={userData?.username}
              // onChange={handleChange}
              fullWidth
              disabled
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
              label="Họ tên"
              name="Name"
              value={userData?.name}
              disabled
              // onChange={handleChange}
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
              label="ID người dùng"
              name="id"
              value={userData?._id}
              disabled
              // onChange={handleChange}
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
              name="address"
              disabled
              value={"Đường Tạ Quang Bửu, phường Linh Trung, thành phố Thủ Đức, Thành phố Hồ Chí Minh."}
              // onChange={handleChange}
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
