import { View, Text, Image } from 'react-native';
import styles from "../assets/style/styles";
import { AntDesign } from '@expo/vector-icons';

export default function RepoCard({ repoData }) {
	const formatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "K" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (Math.abs(num) >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

	return (
		<View style={styles.card}>
			<Text numberOfLines={2} style={styles.repoName}>{repoData.name}</Text>
			{(repoData.description)?(
				<Text numberOfLines={3} style={styles.repoDescription}>{repoData.description}</Text>
			):(null)}
			<View style={styles.cardBottom}>
				<View style={styles.repoOwnerNameAndImage}>
					<Image
						style={styles.repoOwnerImage}
						source={{
							uri: repoData.owner.avatar_url,
						}}
					/>
					<Text style={styles.repoOwnerName}>{repoData.owner.login}</Text>
				</View>
				<View style={styles.repoStars}>
					<AntDesign name="star" size={18} color="black" />
					<Text style={styles.repoStarsCount}>{formatter(repoData.stargazers_count,1)}</Text>
				</View>
			</View>
		</View>
	);
}