import { useState, useEffect } from "react";
import { Form, Input, Button, message, Select } from "antd";
import { db } from "../firebase";
import PeminjamanRequest from "../types";
import Book from "../models/book";
import { converter } from "../helper/converter";

const { Option } = Select;

function TambahPeminjaman() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("books")
      .withConverter(converter<Book>())
      .onSnapshot((querySnapshot) => {
        const bookData: any = [];
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const book = { ...doc.data(), id: doc.id };
            bookData.push(book);
          }
        });
        setBooks(bookData);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const onFinish = async (values: any) => {
    try {
      const memberID = values.memberID;
      const bookIDs = selectedBooks;

      // Batasan jumlah maksimum buku yang dapat dipilih
      if (bookIDs.length > 2) {
        message.error("Anda hanya dapat memilih maksimal 2 buku.");
        return;
      }

      const requestBody: PeminjamanRequest = {
        memberID,
        bookIDs,
      };
      console.log("requestBody: ", requestBody);

      const response = await fetch("http://localhost:3001/rent/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        message.success("Peminjaman berhasil ditambahkan!");
        window.location.href = "/";
      } else {
        message.error("Terjadi kesalahan saat menambahkan peminjaman.");
      }
    } catch (error) {
      console.error("Error adding peminjaman: ", error);
      message.error("Terjadi kesalahan saat menambahkan peminjaman.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Tambah Peminjaman Buku</h2>
      <Form
        name="tambahPeminjaman"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          dueDate: null,
        }}
      >
        <Form.Item
          label="Member ID"
          name="memberID"
          rules={[
            {
              required: true,
              message: "Harap masukkan Member ID!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Buku-buku yang dipinjam"
          name="bookIDs"
          rules={[
            {
              required: true,
              type: "array",
              message: "Harap pilih buku-buku yang dipinjam!",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Pilih buku-buku yang dipinjam"
            onChange={(values) => setSelectedBooks(values)}
          >
            {books.map((book: any) => (
              <Option key={book.id} value={book.id}>
                {book.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tambah Peminjaman
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TambahPeminjaman;
