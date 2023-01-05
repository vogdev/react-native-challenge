import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import { Image, NativeModules, SafeAreaView, FlatList, ActivityIndicator, StyleSheet, Text, View} from 'react-native';


export default App = () => {
  var [isLoading, setLoading] = useState(true);
  var [data, setData] = useState([]);
  var [currentPage, setCurrentPage] = useState(1);
  var [thereIsNoMoreResults, seThereIsNoMoreResults] = useState(false);
	const apiEndpont = "https://api.github.com/search/repositories?q=created:2023-01-05&sort=stars&order=desc&page=";

  const getGithubRepositoriesAsync = async () => {
     try {
			fetch(apiEndpont+'1')
      .then(res => res.json())
      .then(res => {
				(res.hasOwnProperty('items')) ? setData(res.items) : seThereIsNoMoreResults(true)
      })
      .catch(err => {
        console.error(err);
      });
    } catch (error) {
      console.error(error);
    } finally {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
    }
  }
	const loadMoreGetGithubRepositoriesAsync = () => {
		try {
			fetch(`${apiEndpont}${currentPage+1}`)
				.then(res => res.json())
				.then(res => {
					if(res.hasOwnProperty('items')){
						setData([...data,...res.items])
						setCurrentPage(currentPage+1)
					}else{
						seThereIsNoMoreResults(true)
					}
				})
				.catch(err => {
					console.error(err);
				});
			} catch (error) {
				console.error(error);
			}
 }
 
  useEffect(() => {
    getGithubRepositoriesAsync();
  }, []);
	const RepoCard = ({ repoData }) => {
		return (
			<View style={styles.card}>
				<Text numberOfLines={1} style={styles.repoName}>{repoData.name}</Text>
				{(repoData.description)?(
					<Text numberOfLines={3}>{repoData.description}</Text>
				):(null)}
				<View style={styles.cardBottom}>
					<View>
						<Text>{repoData.owner.login}</Text>
						<Image
							style={styles.repoOwnerLogo}
							source={{
								uri: repoData.owner.avatar_url,
							}}
						/>
					</View>
					<View>
						<Text>{repoData.stargazers_count}</Text>
					</View>
				</View>

			</View>
		)
	}
  return (
    <SafeAreaView style={styles.topContainer}>
      {isLoading ? (
				<View style={styles.container}>
					<ActivityIndicator size={40} animating={true} color='black' />
				</View>
			): (
				<View>
				<View style={styles.navbar}>
					<Text style={styles.navTitle}>Trending Repos</Text>
				</View>
					<FlatList
						data={data}
						keyExtractor={({ id }, index) => id+index}
						renderItem={({ item }) => (
							<RepoCard repoData={item} />
						)}
						showsVerticalScrollIndicator={false}
						onEndReached={()=>{loadMoreGetGithubRepositoriesAsync()}}
						onEndReachedThreshold={0.01}
						ListFooterComponent={
							(!thereIsNoMoreResults) ? (
									<ActivityIndicator size={40} animating={true} color='black' />
								) : (
									<View style={{marginBottom:150}}>
										<Text>NO DOCS</Text>
									</View>
							)
						}
					/>
				</View>

      )}
    </SafeAreaView>
  );
};
const {StatusBarManager} = NativeModules;

const styles = StyleSheet.create({
	navbar:{
		height:60,
		backgroundColor:'lightgray',
		alignItems:'center',
		justifyContent:'center'
	},
	navTitle:{
		fontSize:23,
		fontWeight:"500"
	},
	topContainer:{
		marginTop:StatusBarManager.HEIGHT,
		flex: 1,
	},
	spaced:{
		padding:20,
	},
	card:{
		borderBottomColor:'black',
		borderBottomWidth:1,
		padding:20
	},
	repoName:{
		fontSize:18,
		fontWeight:"500"
	},
	repoOwnerLogo: {
    width: 50,
    height: 50,
		borderRadius:50,
  },
	cardBottom:{
		display:'flex',
		flexDirection:'row'
	},
  container: {
		margin:24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
