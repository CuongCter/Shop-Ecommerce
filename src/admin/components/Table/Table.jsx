import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";
import { API } from "../../../commom/const.api";

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];


const makeStyle = (status) => {
  if (status === 'Approved') {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if (status === 'Pending') {
    return {
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else {
    return {
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {

  const [trending, setTrending] = React.useState([])
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/statistics`, config)
        console.log(res.data.data[1].product);
        setTrending(res.data.data)
      } catch {
        console.log('err');
      }
    }
    fetchData()
  }, [])
  return (
    <div className="Table">
      <h3 className="font-bold text-2xl mb-3">Sản phẩm Trending</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h3 className="font-extrabold text-xl">
                  Sản phẩm
                </h3>
              </TableCell>
              <TableCell align="left" ><h3 className="font-extrabold text-xl">
                Ảnh
                </h3></TableCell>
              <TableCell align="left"><h3 className="font-extrabold text-xl">
                  Hãng
                </h3></TableCell>
              <TableCell align="left"><h3 className="font-extrabold text-xl">
                  Giá
                </h3></TableCell>
              <TableCell align="left"><h3 className="font-extrabold text-xl">
                  Tồn kho
                </h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {trending.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.product.name}
                </TableCell>
                <TableCell align="left">
                  <img src={item.product.images[0]} className="w-[35px] h-[35px]" alt="" />
                </TableCell>
                <TableCell align="left">{item.product.brand}</TableCell>
                <TableCell align="left">
                  <span className="status" >{item.product.price}</span>
                </TableCell>
                <TableCell align="left" className="Details">{item.product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
