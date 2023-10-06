import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { format } from "date-fns";

const Peminjaman = () => {
  const columns = [
    {
      title: "Member Name",
      dataIndex: "memberName",
      key: "memberName",
    },
    {
      title: "Book Title",
      dataIndex: "bookTitle",
      key: "bookTitle",
    },
    {
      title: "Max Return Date",
      dataIndex: "maxReturnedAt",
      key: "maxReturnedAt",
    },
    {
      title: "Return Date",
      dataIndex: "returnedAt",
      key: "returnedAt",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const getAllPeminjamanData = async () => {
    try {
      const peminjamanRef = db.collection("rents");

      const snapshot = await peminjamanRef.get();

      const peminjamanData: any = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const data = doc.data();
          const memberRef = data.member; // Referensi ke dokumen member
          const bookRef = data.book; // Referensi ke dokumen book
          const memberDoc = await memberRef.get();
          const bookDoc = await bookRef.get();

          const maxReturnedAt = new Date(data.maxReturnedAt.seconds * 1000);
          const maxReturnedAtFormatted = format(maxReturnedAt, "dd-MM-yyyy");

          const returnedAt = data.returnedAt
            ? new Date(data.returnedAt.seconds * 1000)
            : undefined;
          const returnedAtFormatted = returnedAt
            ? format(returnedAt, "dd-MM-yyyy")
            : "belum dikembalikan";

          return {
            memberName: memberDoc.data().name, // Mengambil field name dari dokumen member
            bookTitle: bookDoc.data().title, // Mengambil field title dari dokumen book
            maxReturnedAt: maxReturnedAtFormatted, // Menggunakan field maxReturnedAt dari peminjaman
            returnedAt: returnedAtFormatted, // Menggunakan field returnedAt dari peminjaman
            key: doc.id,
          };
        })
      );

      setDataSource(peminjamanData);
    } catch (error) {
      console.log("error getting peminjaman data ", error);
    }
  };

  useEffect(() => {
    getAllPeminjamanData();
  }, []);

  return (
    <React.Fragment>
      <h1>Data Peminjaman</h1>
      <Table columns={columns} dataSource={dataSource}></Table>
    </React.Fragment>
  );
};

export default Peminjaman;
