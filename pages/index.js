import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import axios from 'axios'
// import { PrismaClient } from '@prisma/client';

import styles from '../styles/Home.module.css'

import WebGL from '../components/WebGL'


const Index = () => {

	// console.log(initialLinks)
  // const [links, setLinks] = useState([])
  const [initialClick, setInitialClick] = useState(false)

  // let linkList = []
  let sites
  const randomRange = 7

  const sitesList = [
		"https://chaos.social/public",
		"https://dragon.style/about",
		"https://donphan.social/explore",
		"https://elekk.xyz/public",
		"https://anarchism.space/about/more",
		"https://aleph.land/public",
		"https://colorid.es/about",
		"https://computerfairi.es/public",
		"https://ephemeral.glitch.social/explore",
		"https://polyglot.city/public",
		"https://scholar.social/",
		"https://social.wxcafe.net/about",
		"https://tabletop.social/about/more",
		"https://toot.cat/public",
		"https://todon.nl/about",
		"https://tenforward.social/about",
		"https://weirder.earth/public",
		"https://witches.live/about",
		"https://social.coop/about",
		"https://tenforward.social/about",
		"https://mastodon.technology/public",
		"https://masto.jews.international/public",
		"https://photog.social/public",
		"https://the.resize.club/about",
		"https://botsin.space/about",
		"https://wubrg.social/public",
    "https://social.simcu.com/about",
    "https://fellies.social/about",
    "https://phpc.social/about",
    "https://mas.to/public",
    "https://mstdn.sanin.link/public",
    "https://m.gretaoto.ca/public",
    "https://social.integritymo.de/main/all",
    "https://lazyatom.social/@james",
    "https://social.finkhaeuser.de/about",
    "https://furries.world/public",
    "https://social.jesuislibre.net/about",
    "https://thraeryn.net/about"
	]

  var init = function () {

		// Initial set sites
		sites = sitesList.slice()

		if (localStorage["currentSiteList"]) {
			// They have storage, filter out any not in the base list, that could be spam now
			var currentSites = JSON.parse(localStorage["currentSiteList"])
			var filteredSites = currentSites.filter(
				(site) => sitesList.indexOf(site) !== -1
			)
			if (filteredSites.length > 0) {
				sites = filteredSites
			}
		}
	}

  // Selects and removes the next website from the list
	var selectWebsite = function () {
		let site, range, index

		range = randomRange > sites.length ? sites.length : randomRange
		index = Math.floor(Math.random() * range)

		site = sites[index]
		sites.splice(index, 1)

		return site
	}

	const openSite = function (url) {
		window.open(url)
	}

  const handleLink = () => {

    const url = selectWebsite()
		openSite(url)

		// User has visited ALL the sites... refresh the list.
		if (sites.length == 0) {
			sites = sitesList.slice()
		}

		localStorage["currentSiteList"] = JSON.stringify(sites)

    if (initialClick === false) {
      setInitialClick(true)
    }
	}

  useEffect(() => {
    // props.data.instances.map( instance => {
    //   const newLinks = [...links]
    //   newLinks.push(`https://${instance.name}`)
    //   linkList.push(`https://${instance.name}`)
    //   //setLinks(newLinks)
    // })
		// initialLinks.map(link => {
		// 	// console.log(link.url)
		// 	sitesList.push(link.url)
		// })

    init()
  })


  return (
    <>
    <div className={styles.container}>
      <h1>Find your Community</h1>
    <button onClick={handleLink} className={styles.button}>
      <h2>{initialClick ? 'GO AGAIN' : 'GO'}</h2>
    </button>
    </div>
    <WebGL></WebGL>
    {/* <div className="blur"></div> */}
    </>
  )
}

// Index.getInitialProps = 
  
//   async function() {

//     const token = '9rvCilDm4NsxKQQiCqpgeOjiMwUDgNb7GfTBGCdbC519vFkvyiRS2p91LJ5tkS3xJDEK6XoDsA6CzUBehaK9hAynsO74HelDwXfIYnYdb5bSu7QdfXx04EVRGzB6tGga'
//     // fetch('https://api.tvmaze.com/search/shows?q=batman')
//     // const data = await res.json()
//   const res = await axios.get('https://instances.social/api/1.0/instances/sample', {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   const data = await res.data

//   console.log(`Show data fetched. Count: ${data.length}`)

//   return {
//     data: data
//   }
// }

// Index.getInitialProps = async function() {

// 		const prisma = new PrismaClient()

//     const links = await prisma.link.findMany()

//   return {
// 			initialLinks: links,
// 			hi: 'hi'
//   }
// }

// async function saveLink (link) {
// 	const response = await fetch('/api/links', {
// 		method: 'POST',
// 		body: JSON.stringify(link)
// 	})

// 	if (!response.ok) {
// 		throw new Error(response.statusText)
// 	}

// 	return await response.json()
// }

export default Index
