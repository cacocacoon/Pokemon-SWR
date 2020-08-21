import React, { useState } from 'react';
import useSWR from 'swr';
import './styles.css';

const POKEMON_SPECIES = 'https://pokeapi.co/api/v2/pokemon-species/';

async function fetcher(url, id) {
	const response = await fetch(url + id);
	return await response.json();
}

export default function App() {
	const [id, setId] = useState(1);
	const { data, mutate, isValidating } = useSWR(
		[POKEMON_SPECIES, id],
		fetcher
	);

	function Search(e) {
		if (!e.target.value) {
			return;
		}

		if (isValidating) {
			return;
		}

		setId(e.target.value);
	}

	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<h2>{data?.names?.[3].name ?? 'loading..'}</h2>
			<label>
				ID:
				<input type="number" value={id} onChange={Search} />
				<button onClick={!isValidating ? mutate : undefined}>
					Search
				</button>
			</label>
		</div>
	);
}

console.clear();
