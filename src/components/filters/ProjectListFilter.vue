<template>
	<div class="project-list__filters">
		<div class="filters-tools">
			<BaseInput
			class="filter-search"
			v-model:value="filters.search" 
			placeholder="Search"
			:leftIcon="{
				name: 'tabler:search',
				width: '16px',
				height: '16px',
			}"
			:rightIcon="{ 
				name: 'tabler:x',
				isHidden: filters.search.length == 0,
				onClick: () => filters.search = ''
			}"/>

			<div class="project-list-filter__mobile-button">
				<BaseIconButton 
				icon="tabler:filter" @click="isOpen = true"/>
			</div>

			<div class="project-list-filter__desktop-content">
				<BaseSelect 
				v-model="filters.categories" :items="selectableItems"
				placeholder="Select categories" multiselect/>
			</div>
		</div>

		<BottomModal :show="isOpen">
			<div class="filter-inner">
				<div class="filter__header">
					<div class="filter-header__icon">
						<Icon 
						icon="tabler:x" @click="isOpen = false"
						height="20px" width="20px"/>
					</div>
					<div class="filter-header__title">
						Filters
					</div>
				</div>
				<div class="filter__items">
					<BaseSelect 
					v-model="filters.categories" :items="selectableItems"
					placeholder="Select categories" multiselect/>
				</div>
			</div>
		</BottomModal>
	</div>
</template>

<script lang="ts">
import BaseIconButton from '../inputs/BaseIconButton.vue'
import BaseSelect from '../inputs/BaseSelect.vue';
import BaseInput from '../inputs/BaseInput.vue'
import BottomModal from '../modals/BottomModal.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';

import SelectableItem from '../../types/selectableItem';
import { computed, ref } from 'vue';
import ProjectCategory from '../../types/projectCategory';

export interface ProjectListFilters {
	categories:	Array<SelectableItem>|null
	search: 	string
}

export default {
	name: "ProjectListFilter",
	components: {
		BottomModal,
		BaseIconButton,
		BaseSelect,
		BaseInput,
		Icon,
	},
	props: {
		modelValue: {
			type: Object as () => ProjectListFilters,
			required: true,
		},
	},
	setup(props) {
		let selectableItems = [
			new ProjectCategory(1, "TS", "#3178c6"),
			new ProjectCategory(2, "Vue", "#41B883"),
			new ProjectCategory(3, "Frontend", "#5CB3FF"),			
			new ProjectCategory(4, "TS", "#3178c6"),
			new ProjectCategory(5, "Vue", "#41B883"),
			new ProjectCategory(6, "Frontend", "#5CB3FF"),
		].map(category => category.toSelectableItem())

		let filters = computed(() => props.modelValue)
		let isOpen = ref(false)

		return {
			isOpen,
			filters,
			selectableItems,
		}
	},
}
</script>

<style  scoped>
.filters-tools{
	box-sizing: border-box;
	
	display: flex;
	flex-direction: row;
	gap: 16px;
}
.project-list-filter__desktop-content{
	display: flex;
	flex-direction: row;
	gap: 16px;
}

@media (min-width: 480px) {
	.project-list-filter__mobile-content{
		display: none;
	}
	.project-list-filter__mobile-button{
		display: none;
	}
}
@media (max-width: 480px) {
	.project-list-filter__desktop-content{
		display: none;
	}
	.filter-search{
		width: 100%;
	}
	.project-list__filters{
		width: 100%;
		/* padding: 0 16px; */
		box-sizing: border-box;
	}
}
.show_content-enter-active{
	animation: go-up .65s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.show_content-leave-active{
	animation: go-up .65s cubic-bezier(0.22, 0.61, 0.36, 1) reverse;
}

@keyframes go-up {
	from {
		bottom: -300px;
	}
	to {
		bottom: 0;
	}
}

.filter__header{
	display: flex;
	flex-direction: row;
	gap: 16px;
}

.filter-header__icon{
	display: flex;
	align-items: center;
}
.filter-header__title{
	font-size: 20px;
	font-weight: 500;
}

.filter-inner{
	display: flex;
	flex-direction: column;
	gap: 16px;
}
.filter__items{
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>