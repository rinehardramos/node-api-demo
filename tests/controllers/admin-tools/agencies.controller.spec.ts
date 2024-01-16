describe('Agencies Test Suite', () => {
    
    function createAgency(payload: any){
        console.log(payload);
        const regionCode = payload.region_code;
        const provinceCode = payload.province_code;
        const refAgencyLocationCodes = [
            {
                agency_location_code_id: 1,
                agency_category_type_id: 2,
                region: "Ilocos Region (Region 01)",
                region_code: "R01",
                province: "Ilocos Norte",
                province_code: "ILN",
                city_municipality: "Adams",
                city_municipality_code: "000",
                barangay: "",
                barangay_code: ""
            },
            {
                agency_location_code_id: 2,
                agency_category_type_id: 2,
                region: "Ilocos Region (Region 01)",
                region_code: "R01",
                province: "Ilocos Norte",
                province_code: "ILN",
                city_municipality: "Adams",
                city_municipality_code: "001",
                barangay: "",
                barangay_code: ""
            }

        ]
        // mock db query to user_tb
        // function queryRefAgencyLocationCodesById(payload: any){
        //     if (payload.agency_location_code_id) {
        //         return refAgencyLocationCodes[payload.agency_location_code_id];
        //     } else {
        //         return "";
        //     }    
        // }
        function queryRefAgencyLocationCodesByRegionCodeAndProvinceCode(regionCode: string, provinceCode: string){
            console.log(regionCode);
            console.log(provinceCode);
            let queryOutput;
            for (let code in refAgencyLocationCodes) {
                const data = JSON.parse(code);
                console.log(data.region_code);
                console.log(data.province_code);
                if (data.region_code === regionCode && data.province_code === provinceCode) {
                    queryOutput = data;
                }
            }
            console.log(queryOutput);
            return queryOutput;
        }

        const agencyInfo = queryRefAgencyLocationCodesByRegionCodeAndProvinceCode(regionCode, provinceCode);
        console.log(agencyInfo);
    }
    // const res = httpMocks.createResponse();
    it('Check For User Code', () => {
        const payload ={
            agency_name: "",
            latitude: "",
            longitude: "",
            agency_location_code_id: 2,
            agency_category_type_id: 2,
            region: "Ilocos Region (Region 01)",
            region_code: "R01",
            province: "Ilocos Norte",
            province_code: "ILN",
            city_municipality: "Adams",
            city_municipality_code: "001",
            barangay: "",
            barangay_code: ""
        }
        const result = createAgency(payload)
        console.log(result);
        // expect(result).toEqual(true);
    });
    function getLocationInfo(payload: any){
        console.log(payload);
        const regionCode = payload.address_primary;
        const provinceCode = payload.address_secondary;
        let municipalityList;
        if (regionCode) {
            if (provinceCode) {
                if (regionCode !== "NCR"){
                    municipalityList = "province";
                } else {
                    municipalityList = "city";
                }
            } else {
                municipalityList = "region";
            }
        } else {
            municipalityList = "all";
        }

        return municipalityList;
        
    }
   
    it('Check For Empty Region Address Code', () => {
        const payload ={
            address_primary: "",
            address_secondary: "",
        }
        const result = getLocationInfo(payload)
        expect(result).toEqual("all");
    });
    it('Check For Empty Province Address Code', () => {
        const payload ={
            address_primary: "NCR",
            address_secondary: "",
        }
        const result = getLocationInfo(payload)
        expect(result).toEqual("region");
    });
    it('Check For Non-NCR Region Code', () => {
        const payload ={
            address_primary: "ILN",
            address_secondary: "R01",
        }
        const result = getLocationInfo(payload)
        expect(result).toEqual("province");
    });
    it('Check For Specific Region Code', () => {
        const payload ={
            address_primary: "NCR",
            address_secondary: "MKT",
        }
        const result = getLocationInfo(payload)
        expect(result).toEqual("city");
    });   
});