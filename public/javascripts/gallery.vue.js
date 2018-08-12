var vm = new Vue({
    el: '#gallery',
    data: {
        showLightBox: false,
        lightBoxInfo: {},
        images: [
            {
                fullSize:'/images/portfolio/1920/alley.jpg',
                thumbnail: '/images/portfolio/thumbnail/alley.jpg',
                alt: 'alley.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/smokey-days.jpg',
                thumbnail: '/images/portfolio/thumbnail/smokey-days.jpg',
                alt: 'smokey-days.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/running-water.jpg',
                thumbnail: '/images/portfolio/thumbnail/running-water.jpg',
                alt: 'running-water.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/bill.jpg',
                thumbnail: '/images/portfolio/thumbnail/bill.jpg',
                alt: 'bill.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/bottle-in-street.jpg',
                thumbnail: '/images/portfolio/thumbnail/bottle-in-street.jpg',
                alt: 'bottle-in-street.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/checkers.jpg',
                thumbnail: '/images/portfolio/thumbnail/checkers.jpg',
                alt: 'checkers.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/city-island-haze.jpg',
                thumbnail: '/images/portfolio/thumbnail/city-island-haze.jpg',
                alt: 'city-island-haze.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/craxked.jpg',
                thumbnail: '/images/portfolio/thumbnail/craxked.jpg',
                alt: 'craxked.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/creeping-on-love.jpg',
                thumbnail: '/images/portfolio/thumbnail/creeping-on-love.jpg',
                alt: 'creeping-on-love.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/grandama.jpg',
                thumbnail: '/images/portfolio/thumbnail/grandama.jpg',
                alt: 'grandama.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/green-street.jpg',
                thumbnail: '/images/portfolio/thumbnail/green-street.jpg',
                alt: 'green-street.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/harrisburg-skyline.jpg',
                thumbnail: '/images/portfolio/thumbnail/harrisburg-skyline.jpg',
                alt: 'harrisburg-skyline.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/kenny.jpg',
                thumbnail: '/images/portfolio/thumbnail/kenny.jpg',
                alt: 'kenny.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/melting-awy.jpg',
                thumbnail: '/images/portfolio/thumbnail/melting-awy.jpg',
                alt: 'melting-awy.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/morning-slumber.jpg',
                thumbnail: '/images/portfolio/thumbnail/morning-slumber.jpg',
                alt: 'morning-slumber.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/no-new-news.jpg',
                thumbnail: '/images/portfolio/thumbnail/no-new-news.jpg',
                alt: 'no-new-news.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/no-where-to-call-home.jpg',
                thumbnail: '/images/portfolio/thumbnail/no-where-to-call-home.jpg',
                alt: 'no-where-to-call-home.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/passing-thru.jpg',
                thumbnail: '/images/portfolio/thumbnail/passing-thru.jpg',
                alt: 'passing-thru.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/sparkler.jpg',
                thumbnail: '/images/portfolio/thumbnail/sparkler.jpg',
                alt: 'sparkler.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/sun-bench.jpg',
                thumbnail: '/images/portfolio/thumbnail/sun-bench.jpg',
                alt: 'sun-bench.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/sun-setting-over-the-city.jpg',
                thumbnail: '/images/portfolio/thumbnail/sun-setting-over-the-city.jpg',
                alt: 'sun-setting-over-the-city.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/too-infinity.jpg',
                thumbnail: '/images/portfolio/thumbnail/too-infinity.jpg',
                alt: 'too-infinity.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/train-yard.jpg',
                thumbnail: '/images/portfolio/thumbnail/train-yard.jpg',
                alt: 'train-yard.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/tree-of-fire.jpg',
                thumbnail: '/images/portfolio/thumbnail/tree-of-fire.jpg',
                alt: 'tree-of-fire.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/triangle-all-they-way-down.jpg',
                thumbnail: '/images/portfolio/thumbnail/triangle-all-they-way-down.jpg',
                alt: 'triangle-all-they-way-down.jpg'
            },
            {
                fullSize:'/images/portfolio/1920/twin-door.jpg',
                thumbnail: '/images/portfolio/thumbnail/twin-door.jpg',
                alt: 'twin-door.jpg'
            },


        ]
    },
    methods: {
        lightBox: function (image, alt) {
            this.lightBoxInfo = {image: image, alt: alt};
            this.showLightBox = !this.showLightBox;
            console.log('CLICKED!');
        }
    }

});