AFRAME.registerComponent("tour", {
    schema: {
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"}
    },
    init: function () {
        this.placesContainer = this.el;
        this.createCards();
    },
    tick: function(){
        const{state}=this.el.getAttribute("tour");
        if(state==="view"){
            this.hideEl([this.placesContainer])
            this.showView();
        }
    },
    hideEl: function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false);
        })
    },
    showView: function(){
        const {selectedCard}=this.data;
        const skyEl=document.querySelector("#main-container");
        skyEl.setAttribute("material",{
            src:"./assets/360_images/${selectedCard}/place-0.jpg",color:"pink"
        })
    },
    createCards: function () {
        const thumbNailsRef = [
            {
                id: "taj-mahal",
                title: "Taj Mahal",
                url: "assets/taj_mahal.png"
            },
            {
                id: "budapest",
                title: "Budapest",
                url: "assets/budapest.jpg"
            },
            {
                id: "eiffel-tower",
                title: "Eiffel Tower",
                url: "assets/eiffel_tower.jpg"
            },
            {
                id: "new-york-city",
                title: "New York City",
                url: "assets/new_york_city.png"
            },
        ];
        let previousXPosition = -60

        for (var item of thumbNailsRef) {
            const posX = previousXPosition + 25;
            const posY = 10;
            const posZ = -40;
            const position = { x: posX, y: posY, z: posZ };
            previousXPosition = posX

            const BorderEl = this.createBorder(position, item.id);
            const ThumbNail = this.createThumbnail(item);
            BorderEl.appendChild(ThumbNail);
            const TitleEl = this.createTitleEl(position, item);
            BorderEl.appendChild(TitleEl);
            this.placesContainer.appendChild(BorderEl)
        }
    },

    createBorder: function (position, id) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("id", id);
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "ring",
            radiusInner: 9,
            radiusOuter: 10
        });
        entityEl.setAttribute("position", position);
        entityEl.setAttribute("material", {
            color: "#00BCD4",
            opacity: 1
        });
        entityEl.setAttribute("cursor-listener",{});

        return entityEl
    },

    createThumbnail: function (item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("visible", true);
        entityEl.setAttribute("geometry", {
            primitive: "circle",
            radius: 9,
        });
        entityEl.setAttribute("material", {
            src: item.url
        });
        return entityEl
    },

    createTitleEl: function (position, item) {
        const entityEl = document.createElement("a-entity");
        entityEl.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            color: "white",
            value: item.title,
        });
        const Elposition = position
        Elposition.y = -20
        entityEl.setAttribute("position", Elposition);
        entityEl.setAttribute("visible", true);
        return entityEl
    }
})