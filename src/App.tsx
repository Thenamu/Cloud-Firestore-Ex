import { useState, useEffect } from "react";
// import { collection, addDoc, DocumentReference, doc, setDoc } from "firebase/firestore";
import { collection, addDoc, DocumentReference, doc, updateDoc, getDoc, DocumentSnapshot, deleteDoc, query, where } from "firebase/firestore";
import { db } from "./firebase.ts";

function App() {

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>(""); 

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    console.log(e.target.value);
  }

  // const docRef = async (): Promise<string> => {
  //   const docReference: DocumentReference = await addDoc(collection(db, "user"), {
  //     name: name,
  //     gender: gender
  //   });
  //   console.log("Document written with ID: ", docReference.id);
  //   return docReference.id;
  // };

  async function createData(): Promise<void> {

    try {
      const docRef: DocumentReference = await addDoc(collection(db, "user"), {
            name: name,
            gender: gender
        });
        console.log("Document written with ID: ", docRef.id);
        setName("");
        setGender("");
    } catch (e) {
      console.error("Error adding document: " , e);
    }
    
  }

  // async function updateData(): Promise<void> {

  //   try {
  //     const docRef: DocumentReference = doc(db, "user", "Uwd33D1X4PHMOKRaFiwk");

  //     await updateDoc(docRef, {
  //         name: name,
  //         gender: gender
  //     });
  //     console.log("Document updated");
  //     setName("");
  //     setGender("");
  //   } catch (e) {
  //     console.error("Error updating document: ", e);
  //   }
  // }

  async function fetchData(): Promise<void> { 
    
    try {
      const docRef: DocumentReference = doc(db, "user", "Uwd33D1X4PHMOKRaFiwk");
      const docSnap: DocumentSnapshot = await getDoc(docRef);
      if(docSnap.exists()) {
        const data = docSnap.data() as { name: string, gender: string }
        setName(data.name);
        setGender(data.gender);
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document");
      }

    } catch (e) {
      console.error("Error fetching document: ", e);
    }
  }

  useEffect(() => { 
    fetchData();
  }, []);

  async function updateDataV2(): Promise<void> {

    try {
        const docRef: DocumentReference = doc(db, "user", "Uwd33D1X4PHMOKRaFiwk");

        const updateFields: Partial<{name: string, gender: string}> = {};
        
        if (name.trim() !== "") {
          updateFields.name = name;
        }
  
        if (gender.trim() !== "") {
          updateFields.gender = gender;
        }

        // const updateFields: Partial<{name: string, gender: string}> = {
        //   ...(name !== null && { name }),
        //   ...(gender !== null && { gender }) 
        // };

        if(Object.keys(updateFields).length > 0) {
          await updateDoc(docRef, updateFields);
        } else {
          console.log("No fields to update");
        }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  async function deleteData(): Promise<void> {

    try {
      await deleteDoc(doc(db, "user", "Test"));
      console.log("Document successfully deleted");
    } catch (e) {
      console.error("Error deleting document: ", e);
    }

  }

  // async function createDataV2(): Promise<void> {

  //   const data = {
  //     name: name,
  //     gender: gender
  //   }

  //   try {
  //     const docRef: DocumentReference = doc(collection(db, "user"));
  //     await setDoc(docRef, data);
  //     console.log("Document written with ID: ", docRef.id);
  //     setName("");
  //     setGender("");
  //   } catch (e) {
  //     console.error("Error adding document: " , e);
  //   }

  // }


  
  return (
    <>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" value={name} onChange={handleNameChange} placeholder="입력하세요."/>
        <label htmlFor="gender"> 성별:</label>
        <input type="text" value={gender} onChange={handleGenderChange} placeholder="입력하세요."/>
        <button onClick={createData}>Submit</button>
        <button onClick={updateDataV2}>Update</button>
        <button onClick={deleteData}>Delete</button>
      </div>
    </>
  );
}

export default App;