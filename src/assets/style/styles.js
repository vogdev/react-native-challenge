import {NativeModules, StyleSheet} from 'react-native';

const {StatusBarManager} = NativeModules;

const styles = StyleSheet.create({
	// General Styles Start
  container: {
		margin:24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
	topContainer:{
		marginTop:StatusBarManager.HEIGHT,
		marginBottom:60,
		flex: 1,
	},
	// General Styles End

	// Navbar Styles Start
	navbar:{
		height:60,
		backgroundColor:'lightgray',
		alignItems:'center',
		justifyContent:'center',
	},
	navTitle:{
		fontSize:23,
		fontWeight:"500",
	},
	// Navbar Styles End

	// Card Styles Start
	card:{
		borderBottomColor:'black',
		borderBottomWidth:1,
		padding:15,
	},
	cardBottom:{
		display:'flex',
		flexDirection:'row',
	},
	// Card Styles End

	// Repository Styles Start
	repoName:{
		fontSize:18,
		fontWeight:"bold",
	},
	repoDescription:{
		marginVertical:10,
	},
	repoOwnerImage: {
    width: 50,
    height: 50,
		borderRadius:50,
  },
	repoOwnerNameAndImage:{
		flex:1,
		justifyContent:'flex-start',
		alignItems:'center',
		flexDirection:'row',
	},
	repoOwnerName:{
		marginLeft:10,
		fontWeight:"500",
		fontSize:18,
	},
	repoStars:{
		alignItems:'center',
		justifyContent:'flex-start',
		flexDirection:'row',
		minWidth:80,
	},
	repoStarsCount:{
		marginLeft:3,
		fontSize:18,
		fontWeight:'500',
	}
	// Repository Styles End
});
export default styles;