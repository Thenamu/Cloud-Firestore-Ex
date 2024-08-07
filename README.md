# Firebase 주요 함수 및 타입

## Firestore 관련 함수

| 함수명 | 설명 |
|--------|------|
| `collection` | Firestore의 특정 컬렉션에 대한 참조를 생성 |
| `addDoc` | Firestore의 특정 컬렉션에 새 문서를 추가 |
| `doc` | Firestore의 특정 문서에 대한 참조를 생성 |
| `updateDoc` | Firestore의 특정 문서를 업데이트 |
| `getDoc` | Firestore의 특정 문서를 가져옴 |
| `deleteDoc` | Firestore의 특정 문서를 삭제 |
| `getDocs` | Firestore의 쿼리 결과에 따라 문서를 가져옴 |
| `onSnapshot` | Firestore의 쿼리 또는 컬렉션에 실시간 리스너를 추가 (실시간 문서 변경 감지) |

## Firebase Storage 관련 함수

| 함수명 | 설명 |
|--------|------|
| `getStorage` | Firebase Storage 인스턴스를 가져옴 |
| `ref` | Storage의 특정 위치에 대한 참조를 생성 |
| `uploadBytes` | Storage에 파일을 업로드 |
| `deleteObject` | Storage에서 파일을 삭제 |

## 타입

| 타입명 | 설명 |
|--------|------|
| `DocumentReference` | Firestore 문서 참조 타입 |
| `DocumentSnapshot` | Firestore 문서 스냅샷 타입 |
| `StorageReference` | Firebase Storage 참조 타입 |

## 데이터베이스 및 스토리지 인스턴스

| 변수명 | 설명 |
|--------|------|
| `db` | Firebase 설정 파일에서 Firestore 데이터베이스 인스턴스를 가져옴 |
