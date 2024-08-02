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
import { db } from "./firebase.ts"; // Firebase 설정 파일에서 Firestore 데이터베이스 인스턴스를 가져옴

function App() {

  interface User {
    id: string;
    name: string;
    gender: string;
  }

  /**
   * useState를 사용하여 상태 변수들을 선언
   */
  // name 상태 변수와 setName 상태 업데이트 함수를 선언, 초기 값은 빈 문자열
  const [name, setName] = useState<string>("");
  // gender 상태 변수와 setGender 상태 업데이트 함수 선언, 초기 값은 빈 문자열
  const [gender, setGender] = useState<string>("");
  // users 상태 변수와 setUsers 상태 업데이트 함수를 선언, 초기 값은 빈 배열
  // users는 User 타입의 객체들로 이루어진 배열 타입
  const [users, setUsers] = useState<User[]>([]);

  /**
   * 이름 입력 필드에 값이 변경될 때 호출되는 함수
   * React.ChangeEvent<T> : 폼 요소의 값이 변경될 때 발생하는 이벤트 타입
   * HTMLInputElement: HTML의 입력 요소 <input> 태그를 가리킴
   * @param e
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value); // 입력된 값으로 name 상태를 업데이트
    console.log(e.target.value); // 변경된 값을 콘솔에 출력
  };

  /**
   * 성별 입력 필드에 값이 변경될 때 호출되는 함수
   * @param e
   */
  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value); // 입력된 값으로 gender 상태를 업데이트
    console.log(e.target.value); // 변경된 값을 콘솔에 출력
  };

  // const docRef = async (): Promise<string> => {
  //   const docReference: DocumentReference = await addDoc(collection(db, "user"), {
  //     name: name,
  //     gender: gender
  //   });
  //   console.log("Document written with ID: ", docReference.id);
  //   return docReference.id;
  // };

  /**
   *  Firestore Data Create
   *  Firestore 데이터베이스에 새로운 문서를 생성하는 비동기 함수
   *
   *  @return 반환 타입 Promise<void>
   */
  async function createData(): Promise<void> {
    try {
      // Firestore의 user 컬렉션에 새 문서를 추가
      // addDoc 함수를 사용하여 문서를 생성, 컬렉션 참조를 얻기 위해 collection 함수 사용
      // docRef가 데이터베이스 내의 특정 문서 위치를 가리키는 참조 객체인 DocumentReference 타입임을 명시적으로 선언
      const docRef: DocumentReference = await addDoc(collection(db, "user"), {
        name: name, // 현재 name 상태 값을 문서의 name 필드에 저장
        gender: gender, // 현재 gender 상태 값을 문서의 gender 필드에 저장
      });
      // 성공적으로 문서가 추가되면 해당 문서의 ID를 콘솔에 출력
      console.log("Document written with ID: ", docRef.id);
      // 문서 추가 후, name과 gender를 빈 문자열로 설정하여 입력 필드 초기화
      setName("");
      setGender("");
    } catch (e) {
      // 오류 메시지 콘솔에 출력
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

  /**
   * Firestore Data Read
   * Firestore에서 특정 문서의 데이터를 읽어오는 비동기 함수
   */
  async function fetchData(): Promise<void> {
    try {
      // user 컬렉션에서 특정 ID를 가진 문서에 대한 참조 객체 생성
      const docRef: DocumentReference = doc(db, "user", "Uwd33D1X4PHMOKRaFiwk");
      // 문서 참조 객체를 사용하여 실제 문서 데이터를 가져옴
      const docSnap: DocumentSnapshot = await getDoc(docRef);
      // 문서 존재 여부 확인
      if (docSnap.exists()) {
        // 문서 데이터를 명시적으로 지정한 타입의 JavaScript 객체로 반환
        const data = docSnap.data() as { name: string; gender: string };
        // 가져온 데이터로 상태 업데이트
        setName(data.name);
        setGender(data.gender);
        // 콘솔에 문서 데이터 출력
        console.log("Document data:", docSnap.data());
      } else {
        // 문서가 존재하지 않는 경우
        console.log("No such document");
      }
    } catch (e) {
      // 오류 메시지 콘솔에 출력
      console.error("Error fetching document: ", e);
    }
  }

  useEffect(() => {
    unsub();
  }, []);

  /**
   *  Firestore에서 데이터를 한 번 가져오는 비동기 함수
   */
  const fetchDataV2 = async (): Promise<void> => {
    //  user 컬렉션에 대한 참조 객체 생성
    const docRef = collection(db, "user");
    // 참조 객체를 사용하여 user 컬렉션의 모든 문서를 가져옴
    const docSnap = await getDocs(docRef);
    // 모든 문서의 배열을 id 필드와 JavaScript 객체 데이터를 포함한 새로운 객체로 변환 후 반환, 생성된 객체는 User 타입으로 단언
    const docList = docSnap.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as User)
    );
    // 매핑된 문서 리스트를 상태로 업데이트
    setUsers(docList);
  };

  /**
   * Firestore 'user' 컬렉션의 실시간 변경사항을 감지하고 업데이트하는 비동기 함수
   * 내부에서 비동기 처리를 하기 때문에 비동기 선언을 하지 않아도 됨
   * 단, 내부 함수가 비동기 처리를 할 경우 비동기 선언을 해줘야함
   */
  const unsub = onSnapshot(collection(db, "user"), (querySnapshot) => {
    // 실시간으로 가져온 변경된 컬렉션의 모든 문서에 대한 User 객체 배열 생성
    const userList: User[] = querySnapshot.docs.map(
      // 모든 문서의 배열을 id 필드와 JavaScript 객체 데이터를 포함한 새로운 객체로 변환 후 반환, 생성된 객체는 User 타입으로 단언
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );
    // 매핑된 문서 리스트를 상태로 업데이트
    setUsers(userList);
  });

  // Partial<{ name: string; gender: string }>
  // interface updateFields = { name?: string; gender?: string; };
  // 이 객체는 name과 gender 중 어느 하나만 가질 수도 있고, 둘 다 가질 수도 있고, 아무것도 가지지 않을 수도 있다.

  /**
   * Firestore Data Update
   * Firestore의 특정 문서를 업데이트하는 비동기 함수
   * @param id 
   */
  async function updateDataV2(id: string): Promise<void> {
    try {
       // Firestore에서 특정 문서 참조 객체 생성
       // 컬렉션에서 매개변수로 주어진 id에 해당하는 문서를 찾음
      const docRef: DocumentReference = doc(db, "user", id);

      // 업데이트할 필드를 저장할 객체 초기화
      // Partial<T>는 T의 모든 속성을 선택적 프로퍼티
      const updateFields: Partial<{ name: string; gender: string }> = {};

      // .trim(): 문자열의 앞뒤 공백 제거
      // name의 상태가 비어있지 않으면 updateFields객체에 추가
      if (name.trim() !== "") {
        updateFields.name = name;
      }

      // gender의 상태가 비어있지 않으면 updateFields객체에 추가
      if (gender.trim() !== "") {
        updateFields.gender = gender;
      }

      // const updateFields: Partial<{name: string, gender: string}> = {
      //   ...(name !== null && { name }),
      //   ...(gender !== null && { gender })
      // };

      // 업데이트할 필드가 하나 이상 있는 경우에만 업데이트 수행
      // Object.keys(): 객체의 속성 키들을 배열로 반환
      if (Object.keys(updateFields).length > 0) {
        await updateDoc(docRef, updateFields); // updateDoc 함수를 사용하여 Firestore 문서 업데이트 요청
        console.log("Document updated"); // 성공 시 콘솔에 로그 출력
      } else {
        console.log("No fields to update"); // 업데이트할 필드가 없을 경우 콘솔에 로그 출력
      }
      // 업데이트 후 입력 필드 초기화
      setName("");
      setGender("");
    } catch (e) {
      console.error("Error updating document: ", e); // 콘솔에 에러 메시지 출력
    }
  }

  /**
   * Firestore Data Delete
   * Firestore에서 데이터를 삭제하는 비동기 함수
   * @param id 
   */
  async function deleteData(id: string): Promise<void> {
    try {
      // Firestore에서 컬렉션의 주어진 id를 가진 문서를 참조 후 deleteDoc 함수를 사용하여 지정된 id의 문서를 컬렉션에서 삭제
      await deleteDoc(doc(db, "user", id));
      // 삭제 성공 시 콘솔에 로그 출력
      console.log("Document successfully deleted");
    } catch (e) {
      // 오류 발생 시 콘솔에 에러 메시지 출력
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
