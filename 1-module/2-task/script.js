import Vue from '/vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    meetup: null,
  },

  async mounted() {
    this.meetup = await this.getMeetups(MEETUP_ID);
  },

  computed: {
    processedMeetup() {
      return {
        ...this.meetup,
        localDate: new Date(this.meetup.date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
        ),
        cover: this.meetup.id ? getMeetupCoverLink(this.meetup) : undefined,
        agenda: this.meetup.agenda.map((item) => ({
          ...item,
          title: !item.title ? agendaItemTitles[item.type] : item.title,
          icon: `/assets/icons/icon-${agendaItemIcons[item.type]}.svg`,
        })),
      };
    },
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    async getMeetups(id) {
      const FULL_URL = !id ? `${API_URL}/meetups` : `${API_URL}/meetups/${id}`;
      return fetch(FULL_URL)
        .then((res) => res.json())
        .catch((e) => console.error(e));
    },
  },
});
