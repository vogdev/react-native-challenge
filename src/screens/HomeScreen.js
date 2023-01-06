import { useEffect, useState } from "react";
import styles from "../assets/style/styles";
import {
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	Text,
	View,
} from "react-native";
import RepoCard from "../components/RepoCard";

export default HomeScreen = () => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [thereIsNoMoreResults, seThereIsNoMoreResults] = useState(false);
	const thirtyDaysAgo = new Date(new Date() - (30*86400000)).toISOString().split('T')[0];
	const apiEndpont = `https://api.github.com/search/repositories?q=created:${thirtyDaysAgo}&sort=stars&order=desc&page=`;

	const getGithubRepositoriesAsync = async () => {
		try {
			fetch(apiEndpont + "1")
				.then((res) => res.json())
				.then((res) => {
					res.hasOwnProperty("items") ? setData(res.items) : seThereIsNoMoreResults(true);
				})
				.catch((err) => {
					// console.error(err);
				});
		} catch (error) {
			// console.error(error);
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};
	const loadMoreGetGithubRepositoriesAsync = () => {
		try {
			fetch(`${apiEndpont}${currentPage + 1}`)
				.then((res) => res.json())
				.then((res) => {
					if (res.hasOwnProperty("items")) {
						setData([...data, ...res.items]);
						setCurrentPage(currentPage + 1);
					} else {
						seThereIsNoMoreResults(true);
					}
				})
				.catch((err) => {
					// console.error(err);
				});
		} catch (error) {
			// console.error(error);
		}
	};

	useEffect(() => {
		getGithubRepositoriesAsync();
	}, []);

	return (
		<SafeAreaView style={styles.topContainer}>
			{isLoading ? (
				<View style={styles.container}>
					<ActivityIndicator size={40} animating={true} color="black" />
				</View>
			) : (
				<View>
					<FlatList
						data={data}
						keyExtractor={({ id }, index) => id + index}
						renderItem={({ item }) => <RepoCard repoData={item} />}
						showsVerticalScrollIndicator={false}
						onEndReached={() => {
							loadMoreGetGithubRepositoriesAsync();
						}}
						onEndReachedThreshold={0.01}
						ListFooterComponent={
							!thereIsNoMoreResults ? (
								<ActivityIndicator size={40} animating={true} color="black" />
							) : (
								<View style={styles.theEndMessageContainer}>
									<Text style={styles.theEndMessage}>You have reached the end</Text>
								</View>
							)
						}
					/>
				</View>
			)}
		</SafeAreaView>
	);
};
