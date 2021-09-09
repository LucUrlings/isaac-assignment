import {mount} from '@vue/test-utils'
import DetailsView from "@/components/DetailsView";

// describe('DetailsView', async () => {
test('test', async () => {
    const wrapper = mount(DetailsView, {
        attachToDocument: true,
        propsData: {
            selectedUser: {
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
        }
    });

        expect(wrapper.html()).toContain('0789-8709333')
        expect(wrapper.html()).toContain('0171-6682773')
        expect(wrapper.html()).toContain('Kirstin')
        expect(wrapper.html()).toContain('Stracke')
        expect(wrapper.html()).not.toContain('-43.1938')
    // })

})
