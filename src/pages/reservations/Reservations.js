import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import "./about.css";
import Navbar from "../../components/NavbarPers";
import { API_URL } from "../../Constants";
const Reservations = (setisLoggedIn) => {

  const username = sessionStorage.getItem('authenticatedUser');
  const{data : user , loading : loadingUser} = useFetch(`${API_URL}/api/estivage/classe/${username}`)
  const { data, loading } = useFetch(
    `${API_URL}/api/estivageReservations/user/`+ username
  );
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // function createData(
  //   name,
  //   calories,
  //   fat,
  //   carbs,
  //   protein,
  // ) {
  //   return { name, calories, fat, carbs, protein };
  // }

  function montant (classe) 
  {
    switch (classe) {
      case "A":
        return 2000;
      case "B":
        return 4000;
      case "C":
        return 6000
      case "D":
        return 8000;
      default:
      return 0;
    }
  };

  if (data.lenght !== 0) {
    return (
      <>
        <Navbar setisLoggedIn={setisLoggedIn}/>
        <div className="container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Numéro de réservation</StyledTableCell>
                  <StyledTableCell align="right">Centre</StyledTableCell>
                  <StyledTableCell align="right">Produit</StyledTableCell>
                  <StyledTableCell align="right">Date de début</StyledTableCell>
                  <StyledTableCell align="right">Date de fin</StyledTableCell>
                  <StyledTableCell align="right">Montant</StyledTableCell>
                  <StyledTableCell align="right">Statut</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.estivageProduit.estivageCentre.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.estivageProduit.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(row.dateDeDebut).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {new Date(row.dateDeFin).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">{user!==null ? montant(user.classe) : 0}</StyledTableCell>
                    <StyledTableCell align="right">Resérvé</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Reservations;
