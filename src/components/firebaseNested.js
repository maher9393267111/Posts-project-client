import React from "react";
import GridLayout from "react-grid-layout";
import { db } from "../firebase";
import { useEffect, useState } from "react";
export default function Home() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 4, static: true },
    { i: "b", x: 0, y: 0, w: 1, h: 1, minW: 2, maxW: 4 },
    { i: "c", x: 0, y: 3, w: 1, h: 1 },
  ];

  const layout2 = [
    { i: "a1", x: 0, y: 0, w: 3, h: 4, static: true },
    { i: "b2", x: 1, y: 0, w: 2, h: 1, minW: 2, maxW: 4 },
    { i: "c3", x: 0, y: 3, w: 1, h: 1 },
  ];

  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);
  const [example, setex] = useState([]);

  console.log(products);
  console.log("wherrrrrrr products");
  const getProducts = () => {
    const docs = [];

    db.collection("categories").onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
        // console.log(docs);
      });
      setCategories(docs);
      const mobilestype = [];
      //collection -----> categories
      // doc ------> electronics
      // collection from electronics doc ----->sub categories
      // sub categories have docs letus say mobiles doc
      // mobiles doc have mobiles company collection
      // mobiles company collection ----> have samsung doc iphone doc lenovo doc
      // samsung doc have product collection
      // product collection have docs
      // every doc in product collecction {a7 2018 name title image .....}
      // path path: "categories/electronics/sub categories/mobiles/mobile company/samsung/samsung products"
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const mobilestype = [];
    db.collection("categories")
      .doc("electronics")
      .collection("sub categories")
      .doc("mobiles")
      .collection("mobile company")
      .doc("samsung")
      .collection("samsung products")
      .onSnapshot((Snapshot) => {
        Snapshot.docs.map((doc) => {
          // console.log(doc);
          mobilestype.push({ ...doc.data(), id: doc.id });

          console.log(mobilestype);
          setproducts(mobilestype);
          console.log(products);

          console.log("samsung products  <--------");
        });
      });
  }, []);

  useEffect(() => {
    const exarray = [];

    db.collection("prac").onSnapshot((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        exarray.push({ ...doc.data(), id: doc.id });
        console.log(exarray);
      });
    });
    setex(exarray);
    // console.log(example);
  }, []);

  return (
    <div>
      <h1>Home page</h1>

      <div>
        {products.map((p) => {
          return (
            <div key={p.id}>
              <p>{p.name}</p>
            </div>
          );
        })}

        {example.map((p) => {
          return (
            <div key={p.id}>
              <p>{p.name}</p>
            </div>
          );
        })}

        {categories.map((p) => {
          return (
            <div key={p.id}>
              <p>{p.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
