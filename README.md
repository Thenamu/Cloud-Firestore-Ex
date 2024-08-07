## Firestore 주요 함수 및 타입

### 컬렉션 및 문서 관련 함수

| 함수명 | 설명 |
|--------|------|
| `collection` | Firestore의 특정 컬렉션에 대한 참조를 생성 |
| `addDoc` | Firestore의 특정 컬렉션에 새 문서를 추가 |
| `doc` | Firestore의 특정 문서에 대한 참조를 생성 |
| `updateDoc` | Firestore의 특정 문서를 업데이트 |
| `getDoc` | Firestore의 특정 문서를 가져옴 |
| `deleteDoc` | Firestore의 특정 문서를 삭제 |
| `getDocs` | Firestore의 쿼리 결과에 따라 문서를 가져옴 |


### 실시간 업데이트 관련 함수

| 함수명 | 설명 |
|--------|------|
| `onSnapshot` | Firestore의 쿼리 또는 컬렉션에 실시간 리스너를 추가 (실시간 문서 변경 감지) |


### 데이터베이스 인스턴스

| 변수명 | 설명 |
|--------|------|
| `db` | Firebase 설정 파일에서 Firestore 데이터베이스 인스턴스를 가져옴 |


### 타입

| 타입명 | 설명 |
|--------|------|
| `DocumentReference` | 문서 참조 타입 |
| `DocumentSnapshot` | 문서 스냅샷 타입 |
