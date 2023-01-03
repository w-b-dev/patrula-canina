import { getUser, postUser } from "./api";

export const handleAnswer = (isCorrect: boolean) => {
	alert(isCorrect ? "✅" : "❌");
};

export const handleUserRegistration = (
	email: string,
	setUserRetrieved: (v: any) => void
) => {
	if (email === "") {
		return;
	}
	// make fetch call to register user
	getUser({ paramEmail: email, paramCat: "patrulha canina" }).then((res) => {
		if (res.data.length > 0) {
			setUserRetrieved(res.data[0]);
			// console.log("user already registered", );
		} else {
			// console.log("user not registered");
			postUser({
				paramEmail: email,
				paramCat: "patrulha canina",
				paramName: "N/A",
			}).then((res) => {
				// console.log("user was registered", res);
				setUserRetrieved(res.data[0]);
			});
		}
	});
};
