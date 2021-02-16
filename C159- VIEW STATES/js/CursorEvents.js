AFRAME.registerComponent("cursor-listener",{
    schema:{
        selectedItemId:{default:"", type: "string"},
    },

    init:function(){
        this.handleClickEvents();
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
    },

    handlePlacesListState: function(){
        const id = this.el.getAttribute("id");
        const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
        if(placesId.includes(id)){
            const placesContainer=document.querySelector("#places-container");
            placesContainer.setAttribute("cursor-listener",{
                selectedItemId: id
            });
            this.el.setAttribute("material",{
                color:"#D76830",
                opacity: 1
            });
        }
    },
    
    handleClickEvents: function(){
        this.el.addEventListener("click",evt=>{
            const placesContainer=document.querySelector("#places-container");
            const{state}=placesContainer.getAttribute("tour");
            if(state==="places-list"){
                const id=this.el.getAttribute("id");
                const placesID=[
                    "budapest","eiffel_tower","new_york_city","taj_mahal"
                ];
                if(placesID.includes(id)){
                    placesContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard: id
                    })
                }
            }
        })
    },

    handleMouseEnterEvents: function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlacesListState();
        });
    },

    handleMouseLeaveEvents: function(){
        this.el.addEventListener("mouseleave",()=>{

            const {selectedItemId}=this.data
            if(selectedItemId){
                const el=document.querySelector(`#${selectedItemId}`);
                const id=el.getAttribute("id");
                if(id==selectedItemId){
                    el.setAttribute("material",{
                        color:"#D76830",
                        opacity: 1
                    });
                }
            }
        })
    }
});