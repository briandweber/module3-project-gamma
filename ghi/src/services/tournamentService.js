// @ts-check
import { tryFetch } from '../utils'

export const baseUrl = import.meta.env.VITE_API_HOST
if (!baseUrl) {
    throw new Error('VITE_API_HOST was not defined')
}

/**
 * @typedef {import('../tournament_types').TournamentRequest} TournamentRequest
 * @typedef {import('../tournament_types').TournamentResponse} TournamentResponse
 * @typedef {import('../types').UserDataResponse} UserDataResponse
 */


/**
 * @param {TournamentRequest} tournamentRequest
 * @return {Promise<TournamentResponse | Error>}
 */

export async function list_tournaments(tournamentRequest){
    const url = `${baseUrl}/api/tournaments/user/${tournamentRequest.user_id}`
    try {
        const res = await fetch(url, {
            method: 'GET',
            body: JSON.stringify(tournamentRequest),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            return new Error('Tournament creation failed')
        }
        /**
         * @type {TournamentResponse}
         */
        const result = await res.json()
        if (typeof result.id !== 'number') {
            return new Error('Invalid Tournament data')
        }
        return result
    } catch (e) {
        if (e instanceof Error) {
            return e
        }
        return new Error('Something unknown happened.')
        }
}
