<template>
	<v-card flat>
		<v-list v-if="playlist.length > 0">
			<SongListCard 
				v-for="(song, n) in playlist" 
				:key="n" 
				:index="n" 
				:song="song" 
				@remove="removeSongFrom(song)"
			/>
		</v-list>

		<template v-else>
			<v-card-title class="justify-center text-center">Your playlist is empty! 🤠</v-card-title>
			<v-card-text class="text-center">Paste any Youtube link into the search bar. 🔥</v-card-text>
		</template>
	</v-card>
</template>

<script>
import SongListCard from "@/components/SongListCard.vue"

export default {
	props: {
		playlist: {
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
		removeSongFrom(song) {
			this.$store.dispatch('room/removeSongInPlaylist', { id_song: song.id_song, id_room: song.id_room });
		}
	},
}
</script>

<style>
</style>
