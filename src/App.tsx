import { useState, useEffect } from "react";
// import { collection, addDoc, DocumentReference, doc, setDoc } from "firebase/firestore";
import {
  collection, // Firestore의 특정 컬렉션에 대한 참조를 생성하는 함수
  addDoc, // Firestore의 특정 컬렉션에 새 문서를 추가하는 함수
  DocumentReference, // 문서 참조 타입
  doc, // Firestore의 특정 문서에 대한 참조를 생성하는 함수
  updateDoc, // Firestore의 특정 문서를 업데이트하는 함수
  getDoc, // Firestore의 특정 문서를 가져오는 함수
  DocumentSnapshot, // 문서 스냅샷 타입
  deleteDoc, // Firestore의 특정 문서를 삭제하는 함수
  getDocs, // Firestore의 쿼리 결과에 따라 문서를 가져오는 함수
  onSnapshot, // Firestore의 쿼리 또는 컬렉션에 실시간 리스너를 추가하는 함수, 실시간 문서 변경 감지
} from "firebase/firestore";
import { db } from "./firebase.ts";

function App() {
  interface User {
    id: string;
    name: string;
    gender: string;
  }

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
    console.log(e.target.value);
  };

  // const docRef = async (): Promise<string> => {
  //   const docReference: DocumentReference = await addDoc(collection(db, "user"), {
  //     name: name,
  //     gender: gender
  //   });
  //   console.log("Document written with ID: ", docReference.id);
  //   return docReference.id;
  // };

  // Firestore Data Create
  async function createData(): Promise<void> {
    try {
      const docRef: DocumentReference = await addDoc(collection(db, "user"), {
        name: name,
        gender: gender,
      });
      console.log("Document written with ID: ", docRef.id);
      setName("");
      setGender("");
    } catch (e) {
      console.error("Error adding document: ", e);
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

  // Firestore Data Read
  async function fetchData(): Promise<void> {
    try {
      const docRef: DocumentReference = doc(db, "user", "Uwd33D1X4PHMOKRaFiwk");
      const docSnap: DocumentSnapshot = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as { name: string; gender: string };
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
    unsub();
  }, []);

  const fetchDataV2 = async (): Promise<void> => {
    const docRef = collection(db, "user");
    const docSnap = await getDocs(docRef);
    const docList = docSnap.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as User)
    );
    setUsers(docList);
  };

  const unsub = onSnapshot(collection(db, "user"), (querySnapshot) => {
    const userList: User[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );

    setUsers(userList);
  });

  // Firestore Data Update
  async function updateDataV2(id: string): Promise<void> {
    try {
      const docRef: DocumentReference = doc(db, "user", id);

      const updateFields: Partial<{ name: string; gender: string }> = {};

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

      if (Object.keys(updateFields).length > 0) {
        await updateDoc(docRef, updateFields);
        console.log("Document updated");
      } else {
        console.log("No fields to update");
      }
      setName("");
      setGender("");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  // Firestore Data Delete
  async function deleteData(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "user", id));
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
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="입력하세요."
        />
        <label htmlFor="gender"> 성별:</label>
        <input
          type="text"
          value={gender}
          onChange={handleGenderChange}
          placeholder="입력하세요."
        />
        <button onClick={createData}>Submit</button>
      </div>
      <div>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.id} {user.name} {user.gender}
              <button
                style={{ display: "inline" }}
                onClick={() => updateDataV2(user.id)}
              >
                Update
              </button>
              <button
                style={{ display: "inline" }}
                onClick={() => deleteData(user.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
