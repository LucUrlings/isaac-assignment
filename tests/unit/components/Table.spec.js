import {shallowMount} from '@vue/test-utils'
import Table from "@/components/Table";
import * as fetchMock from "jest-fetch-mock";

describe("Table.vue", () => {
    fetchMock.enableFetchMocks();

    test('Test getDataFromKey method', () => {
        const wrapper = shallowMount(Table);

        let result = wrapper.vm.getDataFromKey('gender', data.results[0]);
        expect(result).toBe("female");

        result = wrapper.vm.getDataFromKey('name.first', data.results[0]);
        expect(result).toBe("Emma");
        expect(result).not.toBe("Chu");

        result = wrapper.vm.getDataFromKey('name.last', data.results[0]);
        expect(result).toBe("Chu");

        result = wrapper.vm.getDataFromKey('location.street.number', data.results[0]);
        expect(result).toBe(5985);
        expect(result).not.toBe(1);
    })

    test('Filtering', () => {
        const wrapper = shallowMount(Table, {
            data() {
                return {
                    randomUsers: data.results,
                    selectedGenders: ["female", "male"]
                }
            }
        });

        let users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users.length).toBe(10);

        wrapper.setData({
            selectedGenders: ['female']
        });
        users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users.length).toBe(3);

        wrapper.setData({
            selectedGenders: ['male']
        });
        users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users.length).toBe(7);

        wrapper.setData({
            selectedGenders: []
        });
        users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users.length).toBe(0);
    })

    test('Sort configuration Method', () => {
        const wrapper = shallowMount(Table);

        wrapper.vm.sort('name.first')
        expect(wrapper.vm.currentSort).toBe('name.first');
        expect(wrapper.vm.currentSortDirection).toBe('asc')

        wrapper.vm.sort('name.first')
        expect(wrapper.vm.currentSort).toBe('name.first');
        expect(wrapper.vm.currentSortDirection).toBe('desc')

        wrapper.vm.sort('name.first')
        expect(wrapper.vm.currentSort).toBe('');
        expect(wrapper.vm.currentSortDirection).toBe('')

        wrapper.vm.sort('name.first')
        expect(wrapper.vm.currentSort).toBe('name.first');
        expect(wrapper.vm.currentSortDirection).toBe('asc')

        wrapper.vm.sort('name.last')
        expect(wrapper.vm.currentSort).toBe('name.last');
        expect(wrapper.vm.currentSortDirection).toBe('asc')
    })

    test('Sorting', () => {
        const wrapper = shallowMount(Table, {
            data() {
                return {
                    randomUsers: data.results,
                    selectedGenders: ["female", "male"]
                }
            }
        });

        let users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users[0].name.first).toBe("Emma");
        expect(users[1].name.first).toBe("Franklin");
        expect(users[2].name.first).toBe("Bernard");
        expect(users[3].name.first).toBe("Sven");
        expect(users[4].name.first).toBe("Cindy");
        expect(users[5].name.first).toBe("Mattis");
        expect(users[6].name.first).toBe("Russell");
        expect(users[7].name.first).toBe("Harrison");
        expect(users[8].name.first).toBe("Janice");
        expect(users[9].name.first).toBe("Benoît");

        wrapper.vm.sort('name.first')

        users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users[0].name.first).toBe("Benoît");
        expect(users[0].name.first).not.toBe("Bernard");
        expect(users[1].name.first).toBe("Bernard");
        expect(users[2].name.first).toBe("Cindy");
        expect(users[3].name.first).toBe("Emma");
        expect(users[4].name.first).toBe("Franklin");
        expect(users[5].name.first).toBe("Harrison");
        expect(users[6].name.first).toBe("Janice");
        expect(users[7].name.first).toBe("Mattis");
        expect(users[8].name.first).toBe("Russell");
        expect(users[9].name.first).toBe("Sven");

        wrapper.vm.sort('name.first')
        users = wrapper.vm.sortedFilteredRandomUsers;
        expect(users[0].name.first).toBe("Sven");
        expect(users[1].name.first).toBe("Russell");
        expect(users[2].name.first).toBe("Mattis");
        expect(users[3].name.first).toBe("Janice");
        expect(users[4].name.first).toBe("Harrison");
        expect(users[5].name.first).toBe("Franklin");
        expect(users[6].name.first).toBe("Emma");
        expect(users[7].name.first).toBe("Cindy");
        expect(users[8].name.first).toBe("Bernard");
        expect(users[9].name.first).toBe("Benoît");
    })
});

let data = {
    "results": [
        {
            "gender": "female",
            "name": {
                "title": "Ms",
                "first": "Emma",
                "last": "Chu"
            },
            "location": {
                "street": {
                    "number": 5985,
                    "name": "Vimy St"
                },
                "city": "Sherbrooke",
                "state": "Manitoba",
                "country": "Canada",
                "postcode": "P4E 3W2",
                "coordinates": {
                    "latitude": "-61.1228",
                    "longitude": "72.1682"
                },
                "timezone": {
                    "offset": "+9:30",
                    "description": "Adelaide, Darwin"
                }
            },
            "email": "emma.chu@example.com",
            "login": {
                "uuid": "63ee9ec2-e90d-4674-81fa-99e4e83ed99c",
                "username": "redmeercat648",
                "password": "zhuai",
                "salt": "JcZACqWf",
                "md5": "d53574d0102ab2ea94fe34e0a622afb9",
                "sha1": "921dad92deeaa5d16a1e69e6f9ac8183f0420354",
                "sha256": "9ae421c654f986ba57e3ec175c44b4f6ca6e590fe32cfb1c417d5f8b41938bc2"
            },
            "dob": {
                "date": "1992-03-27T05:25:19.668Z",
                "age": 29
            },
            "registered": {
                "date": "2006-12-24T06:02:15.475Z",
                "age": 15
            },
            "phone": "529-855-7262",
            "cell": "503-178-1652",
            "id": {
                "name": "",
                "value": null
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/89.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/89.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/89.jpg"
            },
            "nat": "CA"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Franklin",
                "last": "Herrera"
            },
            "location": {
                "street": {
                    "number": 2414,
                    "name": "Valley View Ln"
                },
                "city": "Cape Fear",
                "state": "Vermont",
                "country": "United States",
                "postcode": 47179,
                "coordinates": {
                    "latitude": "-50.0418",
                    "longitude": "65.1734"
                },
                "timezone": {
                    "offset": "-11:00",
                    "description": "Midway Island, Samoa"
                }
            },
            "email": "franklin.herrera@example.com",
            "login": {
                "uuid": "49152cd2-9939-4625-a4f3-5603d2e6a1f1",
                "username": "brownpeacock258",
                "password": "tommyboy",
                "salt": "Pg7eLScV",
                "md5": "46e9833fcda3041197404b888cef6d24",
                "sha1": "d34d64b8067998c06aa0fb95d26cdaf37a2833a1",
                "sha256": "95565674439440fc8db278b01141ddb1a01440191d828cb68b640196ad6f4ef1"
            },
            "dob": {
                "date": "1976-01-24T21:34:55.328Z",
                "age": 45
            },
            "registered": {
                "date": "2016-07-06T13:27:25.094Z",
                "age": 5
            },
            "phone": "(779)-707-8243",
            "cell": "(401)-187-1119",
            "id": {
                "name": "SSN",
                "value": "225-53-6207"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/1.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/1.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/1.jpg"
            },
            "nat": "US"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Bernard",
                "last": "Vasquez"
            },
            "location": {
                "street": {
                    "number": 5450,
                    "name": "Albert Road"
                },
                "city": "Salford",
                "state": "Norfolk",
                "country": "United Kingdom",
                "postcode": "FR99 4NT",
                "coordinates": {
                    "latitude": "17.5894",
                    "longitude": "78.6844"
                },
                "timezone": {
                    "offset": "-2:00",
                    "description": "Mid-Atlantic"
                }
            },
            "email": "bernard.vasquez@example.com",
            "login": {
                "uuid": "0ce3c29d-0cbe-4c1c-9366-7123db121e34",
                "username": "tinysnake281",
                "password": "blue11",
                "salt": "97dEPa68",
                "md5": "e92f7ba507b32d842a33e78954f8ee64",
                "sha1": "95ae4f80bd1b828fb417243a7fa5229ce2f496c9",
                "sha256": "0b520e0352090a8ad7e023fe0ca3f6038129e507501396bf7c5df593bc76025e"
            },
            "dob": {
                "date": "1982-07-29T21:02:33.765Z",
                "age": 39
            },
            "registered": {
                "date": "2015-09-02T10:15:55.275Z",
                "age": 6
            },
            "phone": "015394 02251",
            "cell": "0791-319-028",
            "id": {
                "name": "NINO",
                "value": "HZ 76 81 11 U"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/66.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/66.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/66.jpg"
            },
            "nat": "GB"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Sven",
                "last": "Owren"
            },
            "location": {
                "street": {
                    "number": 1810,
                    "name": "Nedre Vaskegang"
                },
                "city": "Brennåsen",
                "state": "Description",
                "country": "Norway",
                "postcode": "2839",
                "coordinates": {
                    "latitude": "16.9892",
                    "longitude": "31.5665"
                },
                "timezone": {
                    "offset": "-2:00",
                    "description": "Mid-Atlantic"
                }
            },
            "email": "sven.owren@example.com",
            "login": {
                "uuid": "5a30b961-e680-4bac-bf07-a0ef2ed3bca1",
                "username": "smallmeercat425",
                "password": "tuna",
                "salt": "NPrZm3Xn",
                "md5": "f90e399020376010971d7215611c3f2a",
                "sha1": "7242e6f273cf79472233e3c1fabbc8a8f523fab1",
                "sha256": "675bcfff2873c437084bafe8ab7522e55a98d014d662968fd6ed53fe7ce2114e"
            },
            "dob": {
                "date": "1991-04-09T11:12:55.915Z",
                "age": 30
            },
            "registered": {
                "date": "2013-12-09T20:56:06.297Z",
                "age": 8
            },
            "phone": "56343832",
            "cell": "45641118",
            "id": {
                "name": "FN",
                "value": "09049108505"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/0.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/0.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/0.jpg"
            },
            "nat": "NO"
        },
        {
            "gender": "female",
            "name": {
                "title": "Ms",
                "first": "Cindy",
                "last": "Hempel"
            },
            "location": {
                "street": {
                    "number": 4444,
                    "name": "Marktplatz"
                },
                "city": "Niederkassel",
                "state": "Schleswig-Holstein",
                "country": "Germany",
                "postcode": 92985,
                "coordinates": {
                    "latitude": "-43.2682",
                    "longitude": "108.6232"
                },
                "timezone": {
                    "offset": "-3:30",
                    "description": "Newfoundland"
                }
            },
            "email": "cindy.hempel@example.com",
            "login": {
                "uuid": "dc02bde3-1980-4e49-a1c9-296f93cd9a6c",
                "username": "smallostrich650",
                "password": "pornographic",
                "salt": "dPNsxjXl",
                "md5": "05805e86318cdde03efacdab56ff89ce",
                "sha1": "d3a7355085526778ab3cbb2bce5a26ff8b7db8ac",
                "sha256": "7678dbc9f12a46811f553fa551f59a866249f85c662f3fa4886fd554b0546e3f"
            },
            "dob": {
                "date": "1971-09-09T01:25:25.606Z",
                "age": 50
            },
            "registered": {
                "date": "2019-03-21T12:45:45.029Z",
                "age": 2
            },
            "phone": "0327-2000382",
            "cell": "0178-6644056",
            "id": {
                "name": "",
                "value": null
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/6.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/6.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/6.jpg"
            },
            "nat": "DE"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Mattis",
                "last": "Sørheim"
            },
            "location": {
                "street": {
                    "number": 4962,
                    "name": "Morells vei"
                },
                "city": "Kirkevoll",
                "state": "Nordland",
                "country": "Norway",
                "postcode": "3612",
                "coordinates": {
                    "latitude": "-54.5599",
                    "longitude": "22.0338"
                },
                "timezone": {
                    "offset": "-3:30",
                    "description": "Newfoundland"
                }
            },
            "email": "mattis.sorheim@example.com",
            "login": {
                "uuid": "858531e5-e803-4491-8388-7cebaea12ff4",
                "username": "ticklishpeacock106",
                "password": "leon",
                "salt": "by6u5iNm",
                "md5": "ea46f6008b03118970b1990a48dfea78",
                "sha1": "b66c80e4f9187bc2316d61f45a0a2035c197d69d",
                "sha256": "3f2ff4182f7457deb92a5e12c6cf75a695c3ff9ed74415ab96f0489dd08fe0dd"
            },
            "dob": {
                "date": "1953-11-27T05:36:43.972Z",
                "age": 68
            },
            "registered": {
                "date": "2010-12-20T05:39:51.716Z",
                "age": 11
            },
            "phone": "52697011",
            "cell": "42967701",
            "id": {
                "name": "FN",
                "value": "27115339368"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/45.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/45.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/45.jpg"
            },
            "nat": "NO"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Russell",
                "last": "Daniels"
            },
            "location": {
                "street": {
                    "number": 5490,
                    "name": "Victoria Street"
                },
                "city": "Truro",
                "state": "South Glamorgan",
                "country": "United Kingdom",
                "postcode": "DR6L 6SG",
                "coordinates": {
                    "latitude": "7.2946",
                    "longitude": "-125.1208"
                },
                "timezone": {
                    "offset": "-9:00",
                    "description": "Alaska"
                }
            },
            "email": "russell.daniels@example.com",
            "login": {
                "uuid": "35a7d736-2c11-4918-9196-36ca51199038",
                "username": "orangefish286",
                "password": "1025",
                "salt": "j1guBSnz",
                "md5": "f9d785d353582a36f89a78fe8f31d7a8",
                "sha1": "c36d1b9541f8737cd6a46d6ee23233be052f866a",
                "sha256": "95cde5c1e0357f7f4ae6269c3e30d8725a8be69d92922db38792a211fc21c367"
            },
            "dob": {
                "date": "1949-01-28T20:25:12.029Z",
                "age": 72
            },
            "registered": {
                "date": "2002-12-04T09:37:02.317Z",
                "age": 19
            },
            "phone": "016974 36513",
            "cell": "0796-916-082",
            "id": {
                "name": "NINO",
                "value": "BR 99 40 70 F"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/60.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/60.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/60.jpg"
            },
            "nat": "GB"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Harrison",
                "last": "Li"
            },
            "location": {
                "street": {
                    "number": 6865,
                    "name": "Evans Street"
                },
                "city": "Invercargill",
                "state": "Marlborough",
                "country": "New Zealand",
                "postcode": 45277,
                "coordinates": {
                    "latitude": "-21.0086",
                    "longitude": "-135.9314"
                },
                "timezone": {
                    "offset": "-2:00",
                    "description": "Mid-Atlantic"
                }
            },
            "email": "harrison.li@example.com",
            "login": {
                "uuid": "a89807e5-e162-4e03-99a1-e9cea62c71ef",
                "username": "lazymeercat815",
                "password": "letter",
                "salt": "Vp7HTGDV",
                "md5": "775aac6918fc19e43ea7fd8b97506edd",
                "sha1": "be46c858616ed6e905254207ff78e6697cf3f233",
                "sha256": "16949e0368de99e2e4c02b7e2737ec1713f21f34a082553e2dfa6c93055fc45c"
            },
            "dob": {
                "date": "1959-08-02T16:11:00.550Z",
                "age": 62
            },
            "registered": {
                "date": "2017-10-31T09:36:08.725Z",
                "age": 4
            },
            "phone": "(056)-230-0711",
            "cell": "(337)-096-2797",
            "id": {
                "name": "",
                "value": null
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/70.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/70.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/70.jpg"
            },
            "nat": "NZ"
        },
        {
            "gender": "female",
            "name": {
                "title": "Mrs",
                "first": "Janice",
                "last": "Olson"
            },
            "location": {
                "street": {
                    "number": 168,
                    "name": "Depaul Dr"
                },
                "city": "Bundaberg",
                "state": "South Australia",
                "country": "Australia",
                "postcode": 4907,
                "coordinates": {
                    "latitude": "-37.3434",
                    "longitude": "139.6062"
                },
                "timezone": {
                    "offset": "0:00",
                    "description": "Western Europe Time, London, Lisbon, Casablanca"
                }
            },
            "email": "janice.olson@example.com",
            "login": {
                "uuid": "3aff77b2-3db5-44b5-86a4-e84fcad133cd",
                "username": "beautifulpeacock433",
                "password": "sailing",
                "salt": "uMXkxutH",
                "md5": "d023ce05499655feba85e85096031ff1",
                "sha1": "d5e1d8a83789e215aad5b7d3b40b53be303f69ff",
                "sha256": "ceb004dfd815fab04c6de12d38aebe4e698a352f65f946846ab1ddcad34acb35"
            },
            "dob": {
                "date": "1958-07-06T08:47:51.342Z",
                "age": 63
            },
            "registered": {
                "date": "2009-08-21T06:24:27.738Z",
                "age": 12
            },
            "phone": "08-0965-1341",
            "cell": "0439-730-905",
            "id": {
                "name": "TFN",
                "value": "230197970"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/62.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/62.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/62.jpg"
            },
            "nat": "AU"
        },
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Benoît",
                "last": "Gootjes"
            },
            "location": {
                "street": {
                    "number": 7747,
                    "name": "Hagweg"
                },
                "city": "Amstenrade",
                "state": "Drenthe",
                "country": "Netherlands",
                "postcode": 16155,
                "coordinates": {
                    "latitude": "-74.2512",
                    "longitude": "127.3813"
                },
                "timezone": {
                    "offset": "+1:00",
                    "description": "Brussels, Copenhagen, Madrid, Paris"
                }
            },
            "email": "benoit.gootjes@example.com",
            "login": {
                "uuid": "a629137a-a4d3-4ec3-ad95-da05a576d636",
                "username": "sadduck728",
                "password": "datsun",
                "salt": "79s4GWqG",
                "md5": "6143e2946ea64dc4fb2e9a1916bd95a1",
                "sha1": "4debda42f12bbc9fa46fdedceeddd4057c1a1ff0",
                "sha256": "d9e234440d3be8b9412b91b98f2709a264887ec4a972abc3cb1a78d39266d4b6"
            },
            "dob": {
                "date": "1952-11-20T01:26:05.920Z",
                "age": 69
            },
            "registered": {
                "date": "2012-11-01T09:04:23.969Z",
                "age": 9
            },
            "phone": "(809)-779-8176",
            "cell": "(745)-169-9089",
            "id": {
                "name": "BSN",
                "value": "82259042"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/14.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/14.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/14.jpg"
            },
            "nat": "NL"
        }
    ],
    "info": {
        "seed": "aeec17efb0cab6b9",
        "results": 10,
        "page": 1,
        "version": "1.3"
    }
};
