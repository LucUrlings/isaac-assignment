import {shallowMount} from '@vue/test-utils'
import DetailsView from "@/components/Details";

describe('Details.vue', () => {
    test('Test if data is present in HTML', async () => {
        const wrapper = shallowMount(DetailsView, {
            propsData: {
                selectedUser
            }
        });

        expect(wrapper.html()).toContain('0789-8709333')
        expect(wrapper.html()).toContain('0171-6682773')
        expect(wrapper.html()).toContain('Kirstin')
        expect(wrapper.html()).toContain('Stracke')
        expect(wrapper.html()).not.toContain('-43.1938')

    })

    test('test age calculator', async () => {
        const wrapper = shallowMount(DetailsView, {
            propsData: {
                selectedUser
            }
        });

        async function updateDob(dateString) {
            wrapper.setProps({
                selectedUser: {...selectedUser, dob: {date: dateString}}
            })

            await wrapper.vm.$nextTick();
        }

        function htmlProvider(Age) {
            return "<tr>\n" +
                "      <th scope=\"row\">Age</th>\n" +
                "      <td>" + Age + "</td>\n" +
                "    </tr>"
        }

        await updateDob("2019-01-28T18:14:42.498Z");
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-02-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-03-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-04-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-05-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-06-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-07-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-08-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        //From here the output changes

        await updateDob("2019-09-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-10-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-11-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(3))

        await updateDob("2019-12-28T18:14:42.498Z")
        expect(wrapper.html()).toContain(htmlProvider(1))
        expect(wrapper.html()).not.toContain(htmlProvider(2))
        expect(wrapper.html()).not.toContain(htmlProvider(3))
    })
})

let selectedUser = {
    gender: "female",
    name: {
        title: "Mrs",
        first: "Kirstin",
        last: "Stracke"
    },
    location: {
        street: {
            number: 3000,
            name: "Jahnstraße"
        },
        city: "Oberlungwitz",
        state: "Mecklenburg-Vorpommern",
        country: "Germany",
        postcode: 88041,
        coordinates: {
            latitude: "-43.1938",
            longitude: "30.1521"
        },
        timezone: {
            offset: "+9:00",
            description: "Tokyo, Seoul, Osaka, Sapporo, Yakutsk"
        }
    },
    email: "kirstin.stracke@example.com",
    dob: {
        date: "1948-01-28T18:14:42.498Z",
        age: 73
    },
    registered: {
        date: "2014-05-24T18:16:09.684Z",
        age: 7
    },
    phone: "0789-8709333",
    cell: "0171-6682773",
    id: {
        name: "",
        value: null
    },
    picture: {
        large: "https://randomuser.me/api/portraits/women/2.jpg",
        medium: "https://randomuser.me/api/portraits/med/women/2.jpg",
        thumbnail: "https://randomuser.me/api/portraits/thumb/women/2.jpg"
    },
    nat: "DE"
}
