// mude o valor desta variável para trocar o emoji no final do texto da guia
const emojiTab = "❀";

let username,
  globalName,
  avatar,
  banner,
  color,
  creationYear,
  formattedUsername,
  formattedName,
  focusedTitle = "";

let isAnimatedBanner = false;

let charactersFetched = false; // Flag to track if characters have been fetched

let intervalId;

const date = new Date();
const year = date.getFullYear();

const audio = new Audio();

const unfocusedTitle = "EI, VOLTA AQUI!!! ᕙ( ᗒᗣᗕ )ᕗ";

const APIErrorMessage = "Calma, a API não é de ferro! (ó﹏ò｡)";

const unknownPath = "unknown.png";
const teamLogosPath = "./assets/images/teamLogos";

const googleSearchString = "https://www.google.com/search?q";

const discordMessagingURL = "https://www.discordapp.com/users";
const glasId = "642382647414226945";
const formattedStringForTalking = `${discordMessagingURL}/${glasId}`;

const malAPICharactersURLBase = "https://api.jikan.moe/v4/characters";
const discAPIURLBase = "https://discordlookup.mesalytic.moe/v1/user";

const discordPfp = document.getElementById("discord_pfp");
const discordComponent = document.querySelector(".discord");

const favicon = document.getElementById("favicon");

const aboutMe = document.getElementById("about-me");

const voiceBank = document.getElementById("voice-bank");

const usernameNavbar = document.getElementById("username-navbar");
const usernameAboutMe = document.getElementById("username-about-me");

const charactersArea = document.getElementById("characters-area");
const characterExpandedArea = document.getElementById("character-expanded-area");
const characterExpandedAreaContainer = document.getElementById("character-expanded-area-container");
const characterImg = document.getElementById("character-img");
const characterName = document.getElementById("character-name");
const characterJapaneseName = document.getElementById("character-japanese-name");

const characterSeries = document.getElementById("character-series");
const characterSeriesLink = document.getElementById("character-series-link");
const characterSeriesIndicator = document.getElementById("character-series-indicator");

const characterTeamName = document.getElementById("character-team-name");
const characterTeamLogo = document.getElementById("character-team-logo");
const characterTeamLink = document.getElementById("character-team-link");
const characterTeamIndicator = document.getElementById("character-team-indicator");

const characterYear = document.getElementById("character-year");
const characterYearIndicator = document.getElementById("character-year-indicator");

const characterBio = document.getElementById("character-bio");
const characterLink = document.getElementById("character-link");

const characterAudioIndicator = document.getElementById("character-audio-indicator");
const characterAudioButton = document.getElementById("character-audio-button");
const characterAudioButtonIcon = document.getElementById("character-audio-button-icon");

const footer = document.querySelector("footer");
const usernameDiscord = document.getElementById("username-discord");
const discordLink = document.getElementById("discord-link");
const helloKitty = document.getElementById("hello-kitty");
const copyrightYear = document.getElementById("copyright-year");

const footerBg = document.getElementById("footer-bg");
const blackOverlay = document.getElementById("black-overlay");

let changed = false;

const changeTitle = (title) => {
  document.title = title;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// credits: kennebec
function hexToRGBA70Opac(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ", .7)"
    );
  }
  throw new Error("Bad Hex");
}

// credits: lokeshdhakar
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

// credits: andreaswik
function lightOrDark(color) {
  // Variables for red, green, blue values
  var r, g, b, hsp;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    );

    r = color[1];
    g = color[2];
    b = color[3];
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&"));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 127.5) {
    return "light";
  } else {
    return "dark";
  }
}

const getFormattedName = (name) => name.split("_").join(" ");

const getFormattedFilename = (name, isUnknown) => isUnknown ? `./assets/images/${unknownPath}` : `./assets/images/characterPictures/${name}`;

const calculateYearText = (recordYear) => {
  if (recordYear === year) return `este ano`;
  else if (year - recordYear === 1) return `há ${year - recordYear} ano`;
  else if (recordYear - year === 1) return `daqui a ${recordYear - year} ano`;
  else if (recordYear > year) return `daqui a ${recordYear - year} anos`;
  else return `há ${year - recordYear} anos`;
};

const setWallpaper = (qtdWallpapers) => {
  const random = Math.floor(Math.random() * qtdWallpapers) + 1;
  aboutMe.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(./assets/images/components/aboutMe/bg${random}.jpg)`;
  aboutMe.style.backgroundPosition = "0%";
  aboutMe.style.backgroundSize = "cover";
  aboutMe.style.backgroundRepeat = "no-repeat";
};

const getData = async () => {
  const updateFooter = () => {
    const creditContainer = document.createElement("b");
    creditContainer.classList.add("unselectable");

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart");

    const nathanLink = document.createElement("a");
    nathanLink.href = "https://github.com/ntn-ss";
    nathanLink.target = "_blank";
    nathanLink.textContent = "Nathan";

    const amorSpan = document.createElement("span");
    amorSpan.textContent = "amor";
    amorSpan.style.cursor = "pointer";
    amorSpan.addEventListener("click", () => {
      alert(`1 Coríntios 13:4-7.`);
    });

    creditContainer.textContent = "Com ";
    creditContainer.appendChild(amorSpan);
    creditContainer.appendChild(document.createTextNode(", "));
    creditContainer.appendChild(nathanLink);
    creditContainer.appendChild(document.createTextNode(" "));
    creditContainer.appendChild(heartIcon);

    heartIcon.style.color = "red";

    copyrightYear.textContent = `${globalName} ~ © ${creationYear} - ${year}`;

    footer.insertBefore(creditContainer, helloKitty);

    if (color) {
      const isDark = lightOrDark(color) === "dark";
      if (isDark) {
        footer.style.backgroundImage = `url("../assets/images/components/footer/footerBgLight.png")`;
      }
  
      const corTexto = isDark ? "var(--light)" : "var(--dark)";
      document.querySelectorAll("footer *:not(h2, i)").forEach(el => el.style.color = corTexto);
    }

    if (isAnimatedBanner) {
      document.querySelectorAll("footer *:not(h2, div#black-overlay, i)").forEach(el => {
        el.style.color = "var(--light)";
        el.style.zIndex=4;
      });
    }
  };
  try {
    const res = await fetch(`${discAPIURLBase}/${glasId}`);
    if (!res.ok) {
      throw new Error(`Error fetching user data: ${res.status}`);
    }
    const data = await res.json();

    username = data.username;
    formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
    usernameDiscord.textContent = `@${username}`;

    discordLink.href = formattedStringForTalking;
    discordLink.target = "_blank";
    globalName = data.global_name;
    avatar = data.avatar.link;
    
    const isAnimatedAvatar = data.avatar.is_animated;
    if (isAnimatedAvatar) avatar += `.gif`

    isAnimatedBanner = data.banner.is_animated;

    color = data.banner.color;

    if (isAnimatedBanner) {
      const bannerUrl = new URL(data.banner.link);
      bannerUrl.pathname += '.gif'; // Append .gif to the pathname
      banner = bannerUrl.toString(); // Convert back to string
      footer.style.backgroundImage = `url(${banner})`;
      footer.style.backgroundRepeat = "no-repeat";
      footer.style.backgroundSize = "cover";
      footer.style.backgroundPosition = "center";

      footerBg.style.display = "flex";
      blackOverlay.style.display = "flex";

      const colorThief = new ColorThief();
      const img = new Image();

      img.addEventListener('load', function() {
        const tempColor = colorThief.getColor(img);
        color = rgbToHex(tempColor[0], tempColor[1], tempColor[2]);
      });

      img.crossOrigin = 'Anonymous';
      img.src = avatar;
    }

    creationYear = data.created_at.split("-")[0];

    // SE VOCÊ QUISER QUE O TÍTULO DA GUIA SEJA O NOME PÚBLICO DO PERFIL (NO MOMENTO, "Chocolat ❀"), troque o "formattedUsername" da linha abaixo por "globalName".
    // E, ao trocar para o nome público, se ele tiver um emoji por si só, talvez você queira apagar o ${emojiTab} e o espaço antes dele, pra que não fiquem dois emojis
    focusedTitle = `Banco de Vozes ~ ${formattedUsername} ${emojiTab}`;
    document.title = focusedTitle;

    // Aqui tem as vezes em que o nome de usuário aparece na barra de navegação e no "sobre", se quiser trocar para o nome público, mesma instrução acima: troque o que está depois do igual para "globalName" ou ponha "Glascheit" (entre aspas) hard-coded se trocar o usuário da conta mas não quiser que a página se altere.
    usernameAboutMe.textContent = formattedUsername;
    usernameNavbar.textContent = formattedUsername;

    if (avatar) {
      favicon.href = avatar;
    }
    if (color) {
      footer.style.backgroundColor = color;
    }

    updateFooter();
  } catch (error) {
    console.error(error);
    alert("Erro ao obter dados.");
  }
};

const updateCharacterInfo = async (char) => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null; // Reset to prevent memory leaks
  }
  // Check if the expanded area is hidden and show it
  if (characterExpandedArea.classList.contains("display-none")) {
    characterExpandedArea.classList.remove("display-none");

    requestAnimationFrame(() => {
      const innerContainer = characterExpandedArea.querySelector(".container");
      innerContainer.style.opacity = "1";
      innerContainer.style.transform = "translateY(0)";

      characterExpandedArea.style.opacity = "1";
      characterExpandedArea.style.transform = "translateY(0)";
    });
  }

  const { name, series, teamId, year, bio, isJaponice, characterPicture, textColor, backgroundColor, qtdAudios } = char;

  formattedName = getFormattedName(name);

  // Initialize audio index and audio element
  let currentAudioIndex = 1; // Reset to 1 for new character

  // Update button text to include the audio index
  const updateAudioButtonText = () => {
    characterAudioButton.innerHTML = `Tocar áudio ${currentAudioIndex} <i class="fa-solid fa-music" id="character-audio-button-icon"></i>`;
  };

  // Set up the audio button click event
  characterAudioButton.onclick = () => {
    // Play the audio file
    audio.src = `./assets/audio/${name}/${currentAudioIndex}.wav`;
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
    });

    // Increment the audio index or reset if it exceeds qtdAudios
    currentAudioIndex++;
    if (currentAudioIndex > qtdAudios) {
      currentAudioIndex = 1; // Reset to 1 after the last audio
    }
    // Update button text
    updateAudioButtonText();
  };

  // Update the button text to show the current audio index immediately
  updateAudioButtonText(); // Call this immediately after initializing currentAudioIndex

  // Reset button styles to default
  const resetButtonStyles = () => {
    characterAudioButton.style.backgroundColor = ""; // Reset to default
    characterAudioButton.style.color = ""; // Reset to default
    characterAudioButtonIcon.style.color = ""; // Reset to default
    characterAudioButton.style.borderColor = ""; // Reset to default
  };

  // Set button styles based on character properties
  const setButtonStyles = () => {
    const hasCustomColors = backgroundColor && textColor;

    if (hasCustomColors) {
      characterAudioButton.style.backgroundColor = textColor;
      characterAudioButton.style.color = backgroundColor;
      characterAudioButtonIcon.style.color = backgroundColor; // Set icon color
      characterAudioButton.style.borderColor = textColor;
      
      // Define hover handlers
      const hoverInHandler = () => {
        characterAudioButton.style.backgroundColor = backgroundColor; // Use character background color on hover
        characterAudioButton.style.color = textColor; // Use character text color on hover
        characterAudioButtonIcon.style.color = textColor; // Use character text color for icon on hover
        characterAudioButton.style.borderColor = textColor;
      };
      
      const hoverOutHandler = () => {
        characterAudioButton.style.backgroundColor = textColor; // Revert to character background color
        characterAudioButton.style.color = backgroundColor; // Revert to character text color
        characterAudioButtonIcon.style.color = backgroundColor; // Revert to character text color for icon
        characterAudioButton.style.borderColor = textColor;
      };

      // Clear existing event listeners before adding new ones
      characterAudioButton.removeEventListener('mouseenter', hoverInHandler);
      characterAudioButton.removeEventListener('mouseleave', hoverOutHandler);

      // Attach new event listeners
      characterAudioButton.addEventListener('mouseenter', hoverInHandler);
      characterAudioButton.addEventListener('mouseleave', hoverOutHandler);
    } else {
      // Reset styles if no custom colors are set
      resetButtonStyles();
    }
  };

  // Apply background colors and button styles
  if (backgroundColor) {
    characterExpandedArea.style.backgroundColor = backgroundColor;
    characterExpandedAreaContainer.style.backgroundColor = backgroundColor;

    setButtonStyles(); // Call this to set button styles
  } else {
    characterExpandedArea.style.backgroundColor = "";
    characterExpandedAreaContainer.style.backgroundColor = "";
    resetButtonStyles();
  }

  // Set text colors
  if (textColor) {
    characterName.style.color = textColor;
    characterSeries.style.color = textColor;
    characterSeriesIndicator.style.color = textColor;
    characterTeamName.style.color = textColor;
    characterTeamIndicator.style.color = textColor;
    characterYear.style.color = textColor;
    characterYearIndicator.style.color = textColor;
    characterBio.style.color = textColor;
    characterAudioIndicator.style.color = textColor;
    characterAudioButton.style.borderColor = textColor;
  } else {
    characterName.style.color = "";
    characterJapaneseName.style.color = "";
    characterSeries.style.color = "";
    characterSeriesIndicator.style.color = "";
    characterTeamName.style.color = "";
    characterTeamIndicator.style.color = "";
    characterYear.style.color = "";
    characterYearIndicator.style.color = "";
    characterBio.style.color = "";
    characterAudioIndicator.style.color = "";  
    characterAudioButton.style.borderColor = "";
  }

  characterName.textContent = formattedName;
  characterSeries.textContent = series;
  characterSeriesLink.href = `${googleSearchString}=${series.replaceAll(" ", "+")}`;

  await getDataFromTeam(teamId);

  characterYear.textContent = `${year} (${calculateYearText(year)})`;

  const formattedBio = bio.replace(/\n/g, "<br>");
  characterBio.innerHTML = formattedBio;

  if (isJaponice) {
    characterJapaneseName.style.color = textColor;
    await getAdditionalDataFromMAL(formattedName);
    await delay(2000);
  } else {
    characterJapaneseName.textContent = "";
    characterImg.src = characterPicture
      ? getFormattedFilename(characterPicture)
      : getFormattedFilename(unknownPath, true);
    characterLink.href = `${googleSearchString}=${formattedName.replaceAll(" ", "+")}`;
    characterSeriesLink.href = `${googleSearchString}=${series.replaceAll(" ", "+")}`;
    await delay(2000);
  }
};

const getCharacterPictures = async (charId) => {
  try {
      const res = await fetch(`${malAPICharactersURLBase}/${charId}/pictures`);
      if (!res.ok) {
          throw new Error(`Error fetching character pictures: ${res.status}`);
      }
      const data = await res.json();
      return data.data.map(picture => picture.jpg.image_url);
  } catch (error) {
      console.error(error);
      return;
  }
};

const getAdditionalDataFromMAL = async (charName) => {
  try {
    const res = await fetch(`${malAPICharactersURLBase}?q=${charName}&limit=1`);

    const data = await res.json();

    const { name_kanji, images, url, mal_id } = data.data[0];

    characterJapaneseName.textContent = `(${name_kanji})`;
    characterImg.src = images.jpg.image_url;
    characterImg.alt = `Imagem de ${charName}`;
    characterLink.href = url;

    if (charName === "Hiyoko Saionji" && characterImg) {
      characterImg.style.transform = "translate(-50%, -32%)";
    } else {
      characterImg.style.transform = "translate(-50%, -50%)";
    }

    if (!characterImg) {
      characterImg.src = getFormattedFilename(unknownPath, true);
    }

    const characterPictures = await getCharacterPictures(mal_id);

    let currentImageIndex = 0;
    let isChangingImage = false;
  
    const changeImage = () => {
      if (characterPictures.length <= 1 || isChangingImage) return;
  
      isChangingImage = true;
      characterImg.style.opacity = '0';
  
      setTimeout(() => {
        characterImg.src = characterPictures[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % characterPictures.length;
  
        setTimeout(() => {
          characterImg.style.opacity = '1';
          isChangingImage = false;
        }, 50);
      }, 1000);
    };
  
    // Set the interval for changing images
    intervalId = setInterval(changeImage, 7000);

    // Limpa o intervalo quando o componente for desmontado ou quando trocar de personagem
    return () => {
        clearInterval(intervalId);
    };

  } catch (error) {
    alert(APIErrorMessage);
  }
};

const getCharactersImageFromMAL = async (charName) => {
  try {
    const res = await fetch(`${malAPICharactersURLBase}?q=${charName}&limit=1`);
    if (!res.ok) {
      throw new Error(`Error fetching character data: ${res.status}`);
    }

    const data = await res.json();
    const characterImage = data.data[0].images.jpg.image_url;
    if (characterImage) {
      return characterImage;
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    alert(APIErrorMessage);
  }
};

const getDataFromTeam = async (teamId) => {
  try {
    const resTeams = await fetch("./scripts/data/teams.json");
    if (!resTeams.ok) {
      throw new Error(`Error fetching teams: ${resCharacters.status}`);
    }
    const dataTeams = await resTeams.json();
    const foundTeam = dataTeams.find((team) => team.teamId === teamId);
    if (foundTeam) {
      const { teamName, teamLogo, teamHREF } = foundTeam;

      characterTeamName.textContent = teamName;
      if (teamId === 0) {
        characterTeamLogo.src = avatar;
        characterTeamLogo.alt = "Papel autoral";
        characterTeamLink.href = formattedStringForTalking;
      } else if (!teamLogo) {
        characterTeamLogo.src = getFormattedFilename(unknownPath, true);
        characterTeamLogo.alt = "Equipe desconhecida";
        characterTeamLink.href = teamHREF;
      } else if (!teamHREF) {
        characterTeamLogo.src = `${teamLogosPath}/${teamLogo}`;
        characterTeamLogo.alt = `Logo da equipe ${teamName}`;
        characterTeamLink.href = "";
      } else {
        characterTeamLogo.src = `${teamLogosPath}/${teamLogo}`;
        characterTeamLogo.alt = `Logo da equipe ${teamName}`;
        characterTeamLink.href = teamHREF;
      }
    } else {
      characterTeamName.textContent = "Equipe não encontrada";
    }
  } catch (error) {
    console.error("Team data error:", error);
  }
};

let fetchedCharacters = []; // Array to store fetched characters

const getCharactersImages = async () => {
  try {
    const resCharacters = await fetch("./scripts/data/characters.json");
    if (!resCharacters.ok) {
      throw new Error(`Error fetching characters: ${resCharacters.status}`);
    }
    const dataCharacters = await resCharacters.json();

    dataCharacters.sort((a, b) => {
      if (b.year === a.year) {
        return a.name.localeCompare(b.name);
      }
      return b.year - a.year;
    });

    fetchedCharacters = dataCharacters; // Store fetched characters
    charactersFetched = true; // Set the flag to true

    // Check if charactersArea is in view and render characters if it is
    if (isInViewport(charactersArea)) {
      renderCharacters();
    }

  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const renderCharacters = async () => { // Mark the function as async
  const allCharacterElements = []; // Array to store all the character elements

  for (const char of fetchedCharacters) { // Use a for...of loop to allow await
    const { name, isJaponice, characterPicture, backgroundColor, textColor } = char;

    formattedName = getFormattedName(name);
    let charPicture;

    if (isJaponice) {
      charPicture = await getCharactersImageFromMAL(formattedName); // Await here
      await delay(300)
    } else if (characterPicture) {
      charPicture = getFormattedFilename(characterPicture);
    } else {
      charPicture = getFormattedFilename(unknownPath, true);
    }

    const characterInfoMin = document.createElement("div");
    characterInfoMin.classList.add("character-info-min");

    const characterImage = document.createElement("img");
    characterImage.src = charPicture;
    characterImage.alt = `Imagem de ${formattedName}`;

    if (backgroundColor && lightOrDark(backgroundColor) === "dark") {
      characterImage.style.borderColor = backgroundColor;
    } else if (!backgroundColor && textColor) {
      characterImage.style.borderColor = textColor;
    }

    characterImage.addEventListener("click", () => {
      const allCharacterImages = document.querySelectorAll(".character-info-min img");
      if (characterImage.classList.contains("active")) {
        characterImage.classList.remove("active");
        resetCharacterData();
      } else {
        formattedName = getFormattedName(char.name);
        allCharacterImages.forEach((img) => img.classList.remove("active"));
        updateCharacterInfo(char);
        characterImage.classList.add("active");
      }
    });

    characterInfoMin.appendChild(characterImage);
    allCharacterElements.push(characterInfoMin); // Store the character element
  }

  // Append all character elements to the DOM with a delay

  if (window.innerWidth <= 950) {
    for (let i = 0; i < allCharacterElements.length; i++) {
      charactersArea.append(allCharacterElements[i]);
      charactersArea.scrollTo({
        left: charactersArea.scrollWidth,
        behavior: 'smooth'
      });
      await delay(500); // Wait for 500 milliseconds before rendering the next character
    }
  
    // Scroll back to the left after all characters have been rendered
    charactersArea.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  } else {
    for (let i = 0; i < allCharacterElements.length; i++) {
      charactersArea.append(allCharacterElements[i]);
      charactersArea.scrollTo({
        top: charactersArea.scrollHeight,
        behavior: 'smooth'
      });
      await delay(500); // Wait for 500 milliseconds before rendering the next character
    }
  
    // Scroll back to the top after all characters have been rendered
    charactersArea.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

const resetCharacterData = () => {
  characterExpandedArea.opacity = "0";
  characterExpandedArea.style.transform = "translateX(50vw)";

  const innerContainer = characterExpandedArea.querySelector(".container");
  innerContainer.style.opacity = "0";
  innerContainer.style.transform = "translateY(20px)";


  characterExpandedArea.style.backgroundColor = "";
  characterExpandedAreaContainer.style.backgroundColor = "";  
  
  setTimeout(() => {
    characterJapaneseName.textContent = "";
    characterName.textContent = "";
    characterSeries.textContent = "";
    characterImg.src = "";
    characterImg.alt = "";
    characterLink.href = "";
    characterImg.style.transform = "";
    characterTeamName.textContent = "";
    characterTeamLogo.src = "";
    characterTeamLogo.alt = "";
    characterTeamLink.href = "";
    characterExpandedArea.classList.add("display-none");
    characterName.style.color = "";
    characterJapaneseName.style.color = "";
    characterSeries.style.color = "";
    characterSeriesIndicator.style.color = "";
    characterTeamName.style.color = "";
    characterTeamIndicator.style.color = "";
    characterYear.style.color = "";
    characterYearIndicator.style.color = "";
    characterBio.style.color = "";
    characterAudioIndicator.style.color = "";  
  }, 500);
};

const changeDiscordIcon = () => {
  if (!changed && avatar) {
    discordPfp.style.animation = "rotateAnimation .5s linear normal";
    discordPfp.src = avatar;
    discordPfp.style.borderColor = color
      ? hexToRGBA70Opac(color)
      : "var(--discord-green)";
    changed = true;
  } else {
    return;
  }
};

discordComponent.addEventListener("mouseover", changeDiscordIcon);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // When charactersArea is in view and characters have been fetched, render characters
    if (entry.isIntersecting && charactersFetched) {
      renderCharacters();
      // Unobserve once it has been triggered to avoid repeated rendering
      observer.unobserve(entry.target);
    }
  });
});

window.onload = () => {
  setWallpaper(6);
  getData();
  getCharactersImages(); // Fetch characters on load

  // Start observing charactersArea
  observer.observe(charactersArea);

  // Check for URL hash to trigger renderCharacters for specific elements
  if (window.location.hash) {
    const targetElement = document.getElementById(window.location.hash.substring(1));
    if (targetElement && isInViewport(targetElement)) {
      renderCharacters();
    }
  }
};

// Update isInViewport to accept an element parameter
const isInViewport = (element) => {
  const rect = element ? element.getBoundingClientRect() : charactersArea.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

window.onblur = () => {
  changeTitle(unfocusedTitle);
};
window.onfocus = () => {
  changeTitle(focusedTitle);
};