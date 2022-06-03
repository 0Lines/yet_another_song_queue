<template>
	<v-card flat>
		<v-list v-if="playList.length > 0">
			<SongListCard 
				v-for="(song, n) in playList" 
				:key="n" 
				:index="n" 
				:song="song" 
				@remove="removeSongFromPlayList"
			/>
		</v-list>

		<template v-else>
			<v-card-title class="justify-center text-center">Your playlist is empty! 🤠</v-card-title>
			<v-card-text class="text-center">Add songs by pasting the youtube or spotify link into the search bar. 🔥</v-card-text>
		</template>
	</v-card>
</template>

<script>

import SongListCard from "@/components/SongListCard.vue"

export default {
	props: {
		playList: {
			type: Array,
			default: () => []
		}
	},
	mixins: {},
	data(){
		return {
		}
	},
	directives: {},
	components: {
		SongListCard,
	},
	computed: {},
	watch: {},
	methods: {
		removeSongFromPlayList(songIndex){
			console.log("Removing song number " + songIndex + " from playlist.");
			this.$store.dispatch('room/removeSong', songIndex);
		}
	},
}
</script>

<style>
</style>
