const mongoose = require('mongoose');

const landSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: "Feature" },
        properties: {
            GERK_PID:   { type: Number, required: true },
            KMG_MID:    { type: Number, required: true },
            RABA_ID:    { type: Number, required: true },
            DOMACE_IME: { type: String, required: true },
            DRZAVA:     { type: String, required: true },
            AREA:       { type: Number, required: true },
            PERIM:      { type: Number, required: true },
            ST_VTX_OUT: { type: Number, required: true },
            Y_MIN:      { type: Number, required: true },
            X_MIN:      { type: Number, required: true },
            Y_MAX:      { type: Number, required: true },
            X_MAX:      { type: Number, required: true },
            Y_C:        { type: Number, required: true },
            X_C:        { type: Number, required: true },
            IND_OBLIKE: { type: String, required: true },
            Z_AVG:      { type: Number, required: true },
            EXP_AVG:    { type: Number, required: true },
            FI_AVG:     { type: Number, required: true },
            NAGIB_AVG:  { type: Number, required: true },
            D_OD:       { type: Number, required: false },
            POV_HGO:    { type: Number, required: true },
            POV_DO:     { type: Number, required: true },
            POV_PO:     { type: Number, required: true },
            NUP_AREA:   { type: Number, required: true },
            BLOK_ID:    { type: Number, required: true }
        },
        geometry: {
            type: { type: String, required: true },
            coordinates: [ 
                [
                    [
                        [
                            {type: Number},
                            {type: Number}
                        ]
                        
                    ]
                ]
                
            ]
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Land', landSchema);