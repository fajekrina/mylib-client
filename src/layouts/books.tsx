import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import Book from "../models/book";
import { converter } from "../helper/converter";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Books = () => {
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
  ];

  const [dataSource, setDataSource] = useState([]);

  const getAllAvailableBooks = async () => {
    try {
      return db
        .collection("books")
        .withConverter(converter<Book>())
        .where("stock", ">", 0)
        .onSnapshot((querySnapshot) => {
          const books: any = [];
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              books.push({ ...doc.data(), key: doc.id });
            } else {
              console.log("No such book document:", doc.id);
            }
          });
          setDataSource(books);
        });
    } catch (error) {
      console.log("error getting book data ", error);
      return undefined;
    }
  };

  useEffect(() => {
    getAllAvailableBooks();
  }, []);

  return (
    <React.Fragment>
      <h1>Data Buku</h1>
      <Link to="/tambah-peminjaman">
        <Button>Tambah Peminjaman Buku</Button>
      </Link>
      <Table columns={columns} dataSource={dataSource}></Table>
    </React.Fragment>
  );
};

export default Books;
